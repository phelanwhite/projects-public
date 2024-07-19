import dotenv from 'dotenv'
dotenv.config()
const envConfig ={
    PORT:process.env.PORT,

    MONGO_URL:process.env.MONGO_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    TMDB_TOKEN:process.env.TMDB_TOKEN,
    
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET

}
export default envConfig