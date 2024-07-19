import mongoose, { Schema } from "mongoose";

const userModel =mongoose.models.user || mongoose.model('user', new Schema({
    name: String,
    avatar: {type:String, default:`https://avatar.iran.liara.run/public`},
    email: {
        type: String,
        unique: true,
    },
    password:  {
        type: String,
        unique: true,
    },
    phone:  {
        type: String,
    },
    content:  {
        type: String,
    },
    address:  {
        type: String,
    },
    website:  {
        type: String,
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{timestamps:true}))

export default userModel