import mongoose, { Schema } from "mongoose";

const wishlistModel =
  mongoose.models.wishlist ||
  mongoose.model(
    `wishlist`,
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
        isLiked: {
          type: Boolean,
          default: false,
          required: true,
        },
      },
      { timestamps: true }
    )
  );

export default wishlistModel;
