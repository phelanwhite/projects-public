import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../helpers/response.js";
import upload from "../configs/multer.js";
import { verifyTokenAdmin } from "../middlewares/verifyToken.js";
import productModel from "../models/product.js";

const productRoute = express.Router();

productRoute.get(`/`, async (req, res, next) => {
  try {
    const q = req.query.q;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const resp = await productModel
      .find({
        title: { $regex: q, $options: "i" },
      })
      .skip(skip)
      .limit(limit);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});
productRoute.get(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await productModel.findById(id);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});

productRoute.post(
  `/`,
  verifyTokenAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const file = req.file;
      let thumbnail = body?.thumbnail;
      if (file) {
        thumbnail = (await uploadFileToCloudinary(file, `product`)).secure_url;
      }
      const resp = await productModel.create({ ...body, thumbnail });

      return responseHandler(res, {
        status: StatusCodes.OK,
        message: `Product created successfully`,
        result: resp,
      });
    } catch (error) {
      next(error);
    }
  }
);

productRoute.put(`/:id`, verifyTokenAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const file = req.file;
    let thumbnail = body?.thumbnail;
    if (file) {
      thumbnail = (await uploadFileToCloudinary(file, `prouduct`)).secure_url;
      await deleteFileFromCloudinary(body.thumbnail, `prouduct`);
    }
    const resp = await productModel.findByIdAndUpdate(
      id,
      { ...body, thumbnail },
      { new: true }
    );

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Product updated successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

productRoute.delete(`/:id`, verifyTokenAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await productModel.findByIdAndDelete(id, { new: true });

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Product deleted successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

export default productRoute;
