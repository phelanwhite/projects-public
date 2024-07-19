import mongoose, { Schema } from "mongoose";

const commentModel =mongoose.models.comment || mongoose.model('comment', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    id: {
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    comment: {
        type: String,
        required:true
    },

},{timestamps:true}))

export default commentModel