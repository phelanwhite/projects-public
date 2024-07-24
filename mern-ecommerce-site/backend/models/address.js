import mongoose, { Schema } from "mongoose";

const addressModel =
  mongoose.models.address ||
  mongoose.model(
    `address`,
    new Schema(
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        address: {
          type: String,
        },
        city: {
          type: String,
        },
        state: {
          type: String,
        },
        country: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
      { timestamps: true }
    )
  );

export default addressModel;
