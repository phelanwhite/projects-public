import mongoose, { Schema } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "product",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  totalWeight: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
  },
  totalDiscount: {
    type: Number,
    default: 0,
  },
});

const cartModel =
  mongoose.models.cart ||
  mongoose.model(
    `cart`,
    new Schema(
      {
        products: {
          type: [cartItemSchema],
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
        },
      },
      { timestamps: true }
    )
  );

export default cartModel;
