import mongoose, { Schema } from "mongoose";

const postModel =
  mongoose.models.post ||
  mongoose.model(
    "post",
    new Schema(
      {
        title: { type: String, required: true },
        subTitle: { type: String },
        description: { type: String },
        thumbnail: { type: String },
        categories: [{ type: String }],
        tags: [{ type: String }],
        views: { type: Number, default: 0 },
        count_views: { type: Number, default: 0 },
        count_vote: { type: Number, default: 0 },
        count_comment: { type: Number, default: 0 },
        reading_time: { type: Number, default: 0 },
        status: { type: Boolean, default: false },

        author: { type: Schema.Types.ObjectId, ref: "user" },
        // comments: [{ type: Schema.Types.ObjectId, ref: "comment" }],
        // likes: [{ type: Schema.Types.ObjectId, ref: "user" }],
        // dislikes: [{ type: Schema.Types.ObjectId, ref: "user" }],
      },
      { timestamps: true }
    )
  );

export default postModel;
