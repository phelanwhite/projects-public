import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDatabase from "./configs/connect.js";
import envConfig from "./configs/env.js";
import routers from "./routers/index.js";
import { errorHandler } from "./helpers/response.js";

await connectDatabase();
const app = express();
app.listen(envConfig.PORT, () => {
  console.log(`Server is running on port ${envConfig.PORT}`);
});

app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:5173`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Origin"],
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  })
);
app.use(cookieParser());
app.use(bodyParser.json());

app.use(routers);
app.use(`/`, async (req, res, next) => {
  try {
    next();
  } catch (error) {
    next(error);
  }
});

app.use(errorHandler);
