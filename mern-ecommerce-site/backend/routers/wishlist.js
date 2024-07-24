import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../helpers/response.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import wishlistModel from "../models/wishlist.js";

const wishlistRoute = express.Router();

wishlistRoute.get(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const q = req.query.q;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const resp = await wishlistModel
      .find({
        _id: user._id,
        title: { $regex: q, $options: "i" },
      })
      .skip(skip)
      .limit(limit);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});
wishlistRoute.get(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await wishlistModel.findById(id);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});

wishlistRoute.post(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const resp = await wishlistModel.create({ ...body, user: user?._id });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Added item to wishlist successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

wishlistRoute.put(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const resp = await wishlistModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Updated wishlist item successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

wishlistRoute.delete(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await wishlistModel.findByIdAndDelete(id, { new: true });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Removed item from wishlist successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

export default wishlistRoute;
