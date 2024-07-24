import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../helpers/response.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import reviewModel from "../models/review.js";

const reviewRoute = express.Router();

reviewRoute.get(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const q = req.query.q;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const resp = await reviewModel
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
reviewRoute.get(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await reviewModel.findById(id);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});

reviewRoute.post(`/`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;

    const resp = await reviewModel.create({ ...body, user: user?._id });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Review created successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

reviewRoute.put(`/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const resp = await reviewModel.findByIdAndUpdate(
      id,
      { ...body },
      { new: true }
    );

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Review updated successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

reviewRoute.delete(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await reviewModel.findByIdAndDelete(id, { new: true });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Review deleted successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

export default reviewRoute;
