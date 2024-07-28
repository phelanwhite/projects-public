import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_NAME,
});

export const uploadFileToCloundinary = async (file: File) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  const upload = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder: "nextjs-blog-site",
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }
          resolve(result?.secure_url);
        }
      )
      .end(buffer);
  });
  return upload;
};

export const reomveFileToCloundinary = async (file: string) => {
  const public_id = file?.split("/")?.pop()?.split(".")?.[0];
  await cloudinary.uploader.destroy(`nextjs-blog-site/` + public_id);
};
