import mongoose from "mongoose";
import envConfig from "../configs/env.config.js";

export default function ConnectDB(){
    mongoose.connect(envConfig.MONGO_URL,{
        dbName:`mern-movie-site`
    }).then(()=>{
        console.log("Connected to MongoDB");
    }).catch(err=>{
        console.error("Error connecting to MongoDB",err?.message);
        process.exit(1);
    })
}