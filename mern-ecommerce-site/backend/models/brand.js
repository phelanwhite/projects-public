import mongoose, { Schema } from "mongoose";

const branddModel =
  mongoose.models.brand ||
  mongoose.model(
    `brand`,
    new Schema(
      {
        title: {
          type: String,
          required: true,
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

export default branddModel;
