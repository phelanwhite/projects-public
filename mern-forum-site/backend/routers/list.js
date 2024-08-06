import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import listModel from "../models/list.js";
import { handleResponse } from "../helpers/response.js";
import { StatusCodes } from "http-status-codes";

const listRouter = express.Router();

listRouter.get(`/get-all`, async (req, res, next) => {
  try {
    const list = await listModel.find({ status: "public" }).populate("author");
    return handleResponse(res, {
      status: StatusCodes.OK,
      result: list,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const lists = await listModel.findById(id).populate("author");
    return handleResponse(res, {
      status: StatusCodes.OK,
      result: lists,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.get(`/get-all-by-me`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const list = await listModel.find({ author: user._id }).populate("author");
    return handleResponse(res, {
      status: StatusCodes.OK,
      result: list,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.post(`/create`, verifyToken, async (req, res, next) => {
  try {
    const user = req.user;
    const body = req.body;
    const newList = await listModel.create({ ...body, author: user._id });
    return handleResponse(res, {
      status: StatusCodes.CREATED,
      message: "List created successfully",
      result: newList,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.put(`/update-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedList = await listModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List updated successfully",
      result: updatedList,
    });
  } catch (error) {
    next(error);
  }
});
listRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedList = await listModel.findByIdAndDelete(id, {
      new: true,
    });
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "List deleted successfully",
      result: deletedList,
    });
  } catch (error) {
    next(error);
  }
});

export default listRouter;
