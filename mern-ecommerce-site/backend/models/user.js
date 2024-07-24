import mongoose, { Schema } from "mongoose";

const userModel =
  mongoose.models.user ||
  mongoose.model(
    `user`,
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
          required: true,
          enum: [`admin`, `member`],
          default: `member`,
        },
        name: {
          type: String,
          required: true,
        },
        avatar: {
          type: String,
          default: "https://avatar.iran.liara.run/public",
        },
        phone: {
          type: Schema.Types.Mixed,
        },
        description: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );

export default userModel;
