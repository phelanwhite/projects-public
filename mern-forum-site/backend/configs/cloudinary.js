import { v2 as cloudinary } from "cloudinary";
import env from "./env.js";

// Initialize Cloudinary
cloudinary.config({
  cloud_name: env.CLOUDINARY_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

// Function to upload and delete an image to Cloudinary
export async function uploadImage(file) {
  try {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: env.BASE_NAME,
    });

    return result;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}

export async function deleteImage(publicId) {
  try {
    const public_id = publicId?.split("/")?.pop()?.split(".")?.[0];
    await cloudinary.uploader.destroy(env.BASE_NAME + "/" + public_id);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
}
