import mongoose, { Schema } from "mongoose";

const listModel =
  mongoose.models.list ||
  mongoose.model(
    "list",
    new Schema(
      {
        title: { type: String, required: true },
        description: { type: String },
        status: {
          type: String,
          default: false,
        },
        count_views: { type: Number, default: 0 },
        count_vote: { type: Number, default: 0 },
        count_comment: { type: Number, default: 0 },

        author: { type: Schema.Types.ObjectId, ref: "user" },
        comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
        likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
      },
      { timestamps: true }
    )
  );

export default listModel;
