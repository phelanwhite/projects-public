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

        original_price: {
          type: Number,
          required: true,
          default: 0,
        },
        price: {
          type: Number,
          required: true,
          default: 0,
        },

        quantity_sold: {
          type: Number,
          required: true,
          default: 0,
        },
        quantity: {
          type: Number,
          required: true,
          default: 0,
        },

        discount: {
          type: Number,
          default: 0,
        },
        discount_rate: {
          type: Number,
          default: 0,
        },

        review_count: {
          type: Number,
          default: 0,
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

        configurable_options: {
          type: Schema.Types.Mixed,
        },
        highlight: {
          type: Schema.Types.Mixed,
        },
      },
      { timestamps: true }
    )
  );

export default productModel;
