import dotenv from "dotenv";

dotenv.config();

const env = {
  BASE_NAME: process.env.BASE_NAME,
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGODB_URI:
    process.env.MONGODB_URI || "mongodb://localhost:27017/my_database",
  JWT_SECRET: process.env.JWT_SECRET || "your_jwt_secret",

  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
};

export default env;
