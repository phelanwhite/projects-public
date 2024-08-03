import express from "express";
import env from "./configs/env.js";
import { connectDBMongoDB } from "./configs/connectDB.js";
import { handleError } from "./helpers/response.js";
import routers from "./routers/index.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

connectDBMongoDB(env.BASE_NAME);

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.listen(env.PORT, function () {
  console.log(`Server is running on port ${env.PORT}`);
});

app.use(routers);
app.use(handleError);
