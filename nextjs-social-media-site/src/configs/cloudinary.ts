import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadImageToCloudinary(file: File) {
  const result = await cloudinary.uploader.upload(file.webkitRelativePath, {
    folder: "nextjs-social-media-site",
  });
  return result;
}
