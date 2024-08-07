import express from "express";
import { StatusCodes } from "http-status-codes";
import { handleResponse } from "../helpers/response.js";
import upload from "../configs/multer.js";
import { deleteImage, uploadImage } from "../configs/cloudinary.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import postModel from "../models/post.js";

const postRouter = express.Router();

postRouter.post(
  `/create`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const user = req.user;
      const body = req.body;
      const file = req.file;

      // upload and delete thumbnail
      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await uploadImage(file)).secure_url;
        await deleteImage(body.thumbnail);
      }
      // reading time
      const reading_time = Math.ceil(
        Number(body?.description?.split(" ")?.length) / 275
      );
      // create post
      const newPost = await postModel.create({
        ...body,
        thumbnail,
        reading_time,
        author: user._id,
      });

      // response client
      return handleResponse(res, {
        status: StatusCodes.CREATED,
        message: "Post created successfully",
        result: newPost,
      });
    } catch (error) {
      next(error);
    }
  }
);

postRouter.put(
  `/update-id/:id`,
  verifyToken,
  upload.single("file"),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const file = req.file;

      // upload and delete thumbnail
      let thumbnail = body.thumbnail;
      if (file) {
        thumbnail = (await uploadImage(file)).secure_url;
        await deleteImage(body.thumbnail);
      }
      // reading time
      const reading_time = Math.ceil(
        Number(body?.description?.split(" ")?.length) / 275
      );

      // update post
      const postUpdate = await postModel.findByIdAndUpdate(
        id,
        {
          ...body,
          thumbnail,
          reading_time,
        },
        { new: true }
      );

      // response client
      return handleResponse(res, {
        status: StatusCodes.OK,
        message: "Post updated successfully",
        result: postUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
);

postRouter.delete(`/delete-id/:id`, verifyToken, async (req, res, next) => {
  try {
    const id = req.params.id;

    // delete post
    const postDelete = await postModel.findByIdAndDelete(id, { new: true });

    // delete thumbnail
    await deleteImage(postDelete.thumbnail);

    // response client
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Post deleted successfully",
      result: postDelete,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get(`/get-all`, async (req, res, next) => {
  try {
    // query
    const query = {
      title: { $regex: req.query.q || "", $options: "i" },
      status: true,
      // categories: { $all: (req.query.categories || "").split(",") },
      // tags: req.query.tag || "",
      // author: objectId,
    };
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // get all posts
    const posts = await postModel.find(query).skip(skip).populate("author");
    const total_results = await postModel.countDocuments(query);

    // response client
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Posts retrieved successfully",
      result: {
        data: posts,
        limit,
        page,
        total_results,
        total_pages: Math.ceil(total_results / limit),
      },
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get(`/get-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;

    // get post by id
    const post = await postModel.findById(id).populate("author");

    // response client
    return handleResponse(res, {
      status: StatusCodes.OK,
      message: "Post retrieved successfully",
      result: post,
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get(`/get-post-by-author-id/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const offset = (page - 1) * limit;

    const posts = await postModel
      .find({ author: id })
      .skip(offset)
      .limit(limit);
    const post_count = await postModel.countDocuments({ author: id });

    return handleResponse(res, {
      status: StatusCodes.OK,
      result: {
        data: posts,
        total_rows: post_count,
        limit: limit,
        page: page,
        offset: offset,
      },
    });
  } catch (error) {
    next(error);
  }
});

postRouter.get(
  `/get-post-by-me-published`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const posts = await postModel
        .find({ author: user._id, status: true })
        .skip(offset)
        .limit(limit)
        .sort({
          updatedAt: -1,
        })
        .populate(`author`);
      const post_count = await postModel.countDocuments({
        author: user._id,
      });

      return handleResponse(res, {
        status: StatusCodes.OK,
        result: {
          data: posts,
          total_rows: post_count,
          limit: limit,
          page: page,
          offset: offset,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

postRouter.get(
  `/get-post-by-me-drafts`,
  verifyToken,
  async (req, res, next) => {
    try {
      const user = req.user;
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 20;
      const offset = (page - 1) * limit;

      const posts = await postModel
        .find({ author: user._id, status: false })
        .skip(offset)
        .limit(limit)
        .populate(`author`);
      const post_count = await postModel.countDocuments({
        author: user._id,
      });

      return handleResponse(res, {
        status: StatusCodes.OK,
        result: {
          data: posts,
          total_rows: post_count,
          limit: limit,
          page: page,
          offset: offset,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);

export default postRouter;
