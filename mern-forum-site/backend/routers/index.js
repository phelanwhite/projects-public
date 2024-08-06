import express from "express";
import authRouter from "./auth.js";
import postRouter from "./post.js";
import listRouter from "./list.js";

const routers = express.Router();

routers.use(`/auth`, authRouter);
routers.use(`/post`, postRouter);
routers.use(`/list`, listRouter);

export default routers;
