import mongoose, { Schema } from "mongoose";

const myListModel =mongoose.models.myList || mongoose.model('myList', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    title: {
        type: String,
        required:true
    },
    description:{
        type: String,
    },
    items: {
        type: Array,
        default: []
    },

},{timestamps:true}))

export default myListModel