import mongoose, { Schema } from "mongoose";

const userModel =
  mongoose.models.user ||
  mongoose.model(
    "user",
    new Schema(
      {
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
        username: {
          type: String,
          required: true,
          unique: true,
        },
        avatar: {
          type: String,
          default: `https://avatar.iran.liara.run/public`,
        },
        phone: {
          type: String,
        },
        address: {
          type: String,
        },
        website: {
          type: String,
        },
        job: {
          type: String,
        },
        bio: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );

export default userModel;
