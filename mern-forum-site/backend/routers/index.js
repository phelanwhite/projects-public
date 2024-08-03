import express from "express";
import authRouter from "./auth.js";

const routers = express.Router();

routers.use(`/auth`, authRouter);

export default routers;
