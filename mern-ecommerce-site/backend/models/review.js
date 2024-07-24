import mongoose, { Schema } from "mongoose";

const reviewModel =
  mongoose.models.review ||
  mongoose.model(
    `review`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        rating: {
          type: Number,
          required: 0,
        },
        comment: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default reviewModel;
