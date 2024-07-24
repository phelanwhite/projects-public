import {v2 as cloudinaryConfig } from 'cloudinary'
import envConfig from './env.js';

cloudinaryConfig.config({
    cloud_name: envConfig.CLOUDINARY_NAME,
    api_key: envConfig.CLOUDINARY_API_KEY,
    api_secret: envConfig.CLOUDINARY_API_SECRET,
})

export default cloudinaryConfig;

const folderSite = `mern-ecommerce-site`
export async function uploadFileToCloudinary(file, folder) {
    const b64 = Buffer.from(file.buffer).toString("base64");
    let dataURI = "data:" + file.mimetype + ";base64," + b64;
    const fileUri = await cloudinaryConfig.uploader.upload(dataURI, {
      folder: `${folderSite}/${folder}`,
    });
    
    return fileUri;
  }
  
  export async function deleteFileFromCloudinary(fileDeleteUrl, folder) {
    const public_id = fileDeleteUrl?.split("/")?.pop()?.split(".")?.[0];
  
    await cloudinaryConfig.uploader.destroy(
      `${folderSite}/${folder}/` + public_id
    );
  }