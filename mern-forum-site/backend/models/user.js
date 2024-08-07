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
        followers: [{ type: Schema.Types.ObjectId, ref: "user" }],
        following: [{ type: Schema.Types.ObjectId, ref: "user" }],
        // posts: [{ type: Schema.Types.ObjectId, ref: "post" }],
        // lists: [{ type: Schema.Types.ObjectId, ref: "list" }],
        // notifications: [{ type: Schema.Types.ObjectId, ref: "notification" }],
      },
      { timestamps: true }
    )
  );

export default userModel;
