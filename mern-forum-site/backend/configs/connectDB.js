import mongoose from "mongoose";
import env from "./env.js";

export async function connectDBMongoDB() {
  // Import the required modules
  mongoose
    .connect(env.MONGODB_URI, {
      dbName: env.BASE_NAME,
    })
    .then(function (connection) {
      console.log("Connected to MongoDB");
    })
    .catch(function (error) {
      console.error("Failed to connect to MongoDB", error);
      process.exit();
    });
}
