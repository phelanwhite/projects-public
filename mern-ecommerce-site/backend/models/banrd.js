import mongoose, { Schema } from "mongoose";

const banrdModel =
  mongoose.models.banrd ||
  mongoose.model(
    `banrd`,
    new Schema(
      {
        title: {
          type: String,
          required: true,
          unique: true,
        },
        thumbnail: {
          type: String,
        },
        description: {
          type: String,
        },
      },
      { timestamps: true }
    )
  );

export default banrdModel;
