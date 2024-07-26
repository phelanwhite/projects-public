import express from "express";
import upload from "../configs/multer.js";
import {
  deleteFileFromCloudinary,
  uploadFileToCloudinary,
} from "../configs/cloudinary.js";
import { StatusCodes } from "http-status-codes";

const uploadRoute = express.Router();

uploadRoute.post(
  `/upload-file`,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const file = req.file;
      const fileUrl = (await uploadFileToCloudinary(file)).secure_url;
      return res.status(StatusCodes.OK).json(fileUrl);
    } catch (error) {}
  }
);

uploadRoute.post(
  `/upload-multiple`,
  upload.fields("files"),
  async (req, res, next) => {
    try {
      const filesUrl = [];
      const files = req.files;
      // console.log({ files });
      // for (let index = 0; index < files.length; index++) {
      //   const fileUrl = (await uploadFileToCloudinary(files[index])).secure_url;
      //   filesUrl.push(fileUrl);
      // }
      return res.status(StatusCodes.OK).json(files);
      // return res.status(StatusCodes.OK).json(filesUrl);
    } catch (error) {}
  }
);

uploadRoute.delete(`/delete-file/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const fileUrl = await deleteFileFromCloudinary(id);
    return res.status(StatusCodes.OK).json(`Delete file successfully`);
  } catch (error) {}
});

export default uploadRoute;
