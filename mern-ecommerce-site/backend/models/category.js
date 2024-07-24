import mongoose, { Schema } from "mongoose";

const categoryModel =
  mongoose.models.category ||
  mongoose.model(
    `category`,
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

export default categoryModel;
