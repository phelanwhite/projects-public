import mongoose from "mongoose"
import envConfig from "./env.js"

const connectDatabase = async()=>{
    try {
        await mongoose.connect(envConfig.MONGODB_URL,{
            dbName:`mern-ecommerce-site`
        }).then(function(){

            console.log("Connected to MongoDB")
        }).catch(function(error){
            console.error("Error connecting to MongoDB:: ", error?.message)
        })
    } catch (error) {
        console.log(error);
    }
}

export default connectDatabase;