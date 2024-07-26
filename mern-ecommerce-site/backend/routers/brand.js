import express from "express";
import { StatusCodes } from "http-status-codes";
import { responseHandler } from "../helpers/response.js";
import brandModel from "../models/brand.js";
import upload from "../configs/multer.js";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../configs/cloudinary.js";
import { verifyTokenAdmin } from "../middlewares/verifyToken.js";

const brandRoute = express.Router();

brandRoute.get(`/`, async (req, res, next) => {
  try {
    const q = req.query.q || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const total_results = await brandModel.countDocuments();
    const total_page = Math.ceil(total_results / limit);

    const resp = await brandModel
      .find({
        title: { $regex: q, $options: "i" },
      })
      .skip(skip)
      .limit(limit);

    return responseHandler(res, {
      status: StatusCodes.OK,
      result: {
        limit,
        total_page,
        total_results,
        page,
        data: resp,
      },
    });
  } catch (error) {
    next(error);
  }
});
brandRoute.get(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await brandModel.findById(id);

    return responseHandler(res, { status: StatusCodes.OK, result: resp });
  } catch (error) {
    next(error);
  }
});

brandRoute.post(
  `/`,
  verifyTokenAdmin,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const body = req.body;
      const file = req.file;
      let thumbnail = body?.thumbnail;
      if (file) {
        thumbnail = (await uploadFileToCloudinary(file, `brand`)).secure_url;
      }
      const resp = await brandModel.create({ ...body, thumbnail });

      return responseHandler(res, {
        status: StatusCodes.OK,
        message: `Brand created successfully`,
        result: resp,
      });
    } catch (error) {
      next(error);
    }
  }
);

brandRoute.put(
  `/:id`,
  verifyTokenAdmin,
  upload.single(`file`),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;
      let thumbnail = body?.thumbnail;
      if (file) {
        thumbnail = (await uploadFileToCloudinary(file, `brand`)).secure_url;
        await deleteFileFromCloudinary(body.thumbnail, `brand`);
      }
      const resp = await brandModel.findByIdAndUpdate(
        id,
        { ...body, thumbnail },
        { new: true }
      );

      return responseHandler(res, {
        status: StatusCodes.OK,
        message: `Brand updated successfully`,
        result: resp,
      });
    } catch (error) {
      next(error);
    }
  }
);

brandRoute.delete(`/:id`, verifyTokenAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;
    const resp = await brandModel.findByIdAndDelete(id, { new: true });

    if (resp.thumbnail) {
      await deleteFileFromCloudinary(resp.thumbnail, `brand`);
    }

    return responseHandler(res, {
      status: StatusCodes.OK,
      message: `Brand deleted successfully`,
      result: resp,
    });
  } catch (error) {
    next(error);
  }
});

export default brandRoute;
