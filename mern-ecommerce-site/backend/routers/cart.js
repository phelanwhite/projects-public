import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../helpers/response.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import cartModel from "../models/cart.js";
const cartRoute = express.Router();

cartRoute.get(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const q = req.query.q;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const resp = await cartModel
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
cartRoute.get(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await cartModel.findById(id);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});

cartRoute.post(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const resp = await cartModel.create({ ...body, user: user?._id });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Added item to cart successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

cartRoute.put(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const resp = await cartModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Updated cart item successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

cartRoute.delete(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await cartModel.findByIdAndDelete(id, { new: true });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Removed item from cart successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

export default cartRoute;
