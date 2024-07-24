import mongoose, { Schema } from "mongoose";

const orderModel =
  mongoose.models.order ||
  mongoose.model(
    `order`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        products: {
          type: [Schema.Types.ObjectId],
          ref: "product",
          required: true,
        },
        shippingAddress: {
          type: Schema.Types.ObjectId,
          ref: "address",
          required: true,
        },
        totalQuantity: {
          type: Number,
          required: true,
          default: 0,
        },
        totalPrice: {
          type: Number,
          required: true,
          default: 0,
        },
        status: {
          type: String,
          enum: ["Pending", "Completed", "Canceled"],
          default: "Pending",
        },
      },
      { timestamps: true }
    )
  );

export default orderModel;
