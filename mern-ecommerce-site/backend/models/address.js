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
        name: {
          type: String,
        },
        company: {
          type: String,
        },
        phone: {
          type: String,
        },
        country: {
          type: String,
        },
        provinces: {
          type: String,
        },
        district: {
          type: String,
        },
        wards: {
          type: String,
        },
        address: {
          type: String,
        },
        address_type: {
          type: String,
          enum: ["House / Apartment", "Agency / Company"],
          default: "House / Apartment",
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
