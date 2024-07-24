import mongoose, { Schema } from "mongoose";

const productModel =
  mongoose.models.product ||
  mongoose.model(
    `product`,
    new Schema(
      {
        title: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
          required: true,
        },
        thumbnail: {
          type: String,
        },
        images: {
          type: [String],
        },
        description: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },

        category: {
          type: Schema.Types.ObjectId,
          ref: "category",
        },
        banrd: {
          type: Schema.Types.ObjectId,
          ref: "banrd",
        },
        rating: {
          type: Number,
          default: 0,
        },
        numReviews: {
          type: Number,
          default: 0,
        },

        options: {
          type: Schema.Types.Mixed,
        },
        highlight: {
          type: [String],
        },
      },
      { timestamps: true }
    )
  );

export default productModel;
