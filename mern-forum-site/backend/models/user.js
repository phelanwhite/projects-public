import mongoose, { Schema } from "mongoose";

const userModel =
  mongoose.models.user ||
  mongoose.model(
    "user",
    new Schema(
      {
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
        role: {
          type: String,
          default: "user",
          enum: ["user", "admin"],
        },
      },
      { timestamps: true }
    )
  );

export default userModel;
