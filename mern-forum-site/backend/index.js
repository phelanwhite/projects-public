import express from "express";
import env from "./configs/env.js";
import { connectDBMongoDB } from "./configs/connectDB.js";
import { handleError } from "./helpers/response.js";
import routers from "./routers/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import upload from "./configs/multer.js";

connectDBMongoDB(env.BASE_NAME);

const app = express();
app.listen(env.PORT, function () {
  console.log(`Server is running on port ${env.PORT}`);
});
app.use(
  cors({
    origin: [`http://localhost:5173`],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(bodyParser.json());

app.use(routers);
app.use(handleError);
