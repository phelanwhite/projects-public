import mongoose, { Schema } from "mongoose";

const myFavouriteModel =mongoose.models.myFavourite || mongoose.model('myFavourite', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required:true
    },
    favouriteId: {
        type: String,
        required:true
    },
    favouriteType: {
        type: String,
        required:true
    },

},{timestamps:true}))

export default myFavouriteModel