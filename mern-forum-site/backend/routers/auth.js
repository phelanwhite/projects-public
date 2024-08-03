import express from "express";
import createHttpError from "http-errors";
import { StatusCodes } from "http-status-codes";
import Joi from "joi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { handleResponse } from "../helpers/response.js";
import env from "../configs/env.js";
import userModel from "../models/user.js";
import upload from "../configs/multer.js";
import { uploadImage } from "../configs/cloudinary.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const authRouter = express.Router();

authRouter.post(`/signup`, async (req, res, next) => {
  try {
    const body = req.body;
    console.log(body);

    // validate
    const schema = signupValidator.validate(body);
    if (schema.error) {
      throw createHttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        schema.error.details[0].message
      );
    }

    // check user exsits
    const userExists = await userModel.findOne({ email: body?.email });
    if (userExists) {
      throw createHttpError(StatusCodes.CONFLICT, "User already exists");
    }

    // hash password
    const salt = await bcrypt.genSalt(body?.password);
    const hashedPassword = await bcrypt.hash(body?.password, salt);

    // create user
    const newUser = await userModel.create({
      ...body,
      password: hashedPassword,
    });

    // response client
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post(`/signin`, async (req, res, next) => {
  try {
    const body = req.body;

    // validate
    const schema = signinValidator.validate(body);
    if (schema.error) {
      throw createHttpError(
        StatusCodes.UNPROCESSABLE_ENTITY,
        schema.error.details[0].message
      );
    }

    // check user exsits
    const userExists = await userModel.findOne({ email: body.email });
    if (!userExists) {
      throw createHttpError(StatusCodes.NOT_FOUND, "Invalid credentials");
    }

    // check password
    const isMatch = await bcrypt.compare(body.password, userExists.password);
    if (!isMatch) {
      throw createHttpError(StatusCodes.NOT_FOUND, "Invalid credentials");
    }

    // generate token
    const token = jwt.sign(
      { _id: userExists._id, role: userExists.role },
      env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // save token to cookie
    res.cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000 });

    // response client
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "User signed in successfully",
      result: userExists,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.get(`/profile`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const userExists = await userModel.findById(user._id);

    // response client
    return handleResponse(res, {
      status: StatusCodes.OK,
      result: userExists,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.put(
  `/update-profile`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;
      const avatar = body.avatar;
      if (file) {
        avatar = (await uploadImage(file)).secure_url;
      }

      const userUpdate = await userModel.findByIdAndUpdate(
        user._id,
        { ...body, avatar: avatar },
        { new: true }
      );

      // response client
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "User profile updated successfully",
        result: userUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(`/signout`, async (req, res, next) => {
  try {
    // clear token from cookie
    res.clearCookie("token");

    // response client
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "User signed out successfully",
      result: null,
    });
  } catch (error) {
    next(error);
  }
});

export default authRouter;

// validate
const signupValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.ref("password"),
});
const signinValidator = Joi.object({
  email: Joi.string().pattern(new RegExp(`@gmail.com`)).email().required(),
  password: Joi.string().required(),
});
