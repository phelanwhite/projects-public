"use server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export async function uploadFile(formData: FormData) {
  const file = formData.get("file") as File;
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: `nextjs-blog-site` }, function (err, result) {
        if (err) {
          reject(err);
          return;
        }
        resolve(result?.secure_url as string);
      })
      .end(buffer);
  });
}

export async function deleteFile(file_url: string) {
  const public_id = file_url?.split("/")?.pop()?.split(".")?.[0];
  return await cloudinary.uploader.destroy(`nextjs-blog-site/` + public_id);
}
