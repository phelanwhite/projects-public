import { v2 as cloudinaryConfig } from "cloudinary";
import envConfig from "./env";

cloudinaryConfig.config({
  cloud_name: envConfig.CLOUDINARY_NAME,
  api_key: envConfig.CLOUDINARY_API_KEY,
  api_secret: envConfig.CLOUDINARY_API_SECRET,
});

export default cloudinaryConfig;

const folderSite = `nextjs-blog-site`;
export async function uploadFileToCloudinary(file: File, folder?: string) {
  const arrayBuffer = await (file as unknown as File).arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const fileUpload = cloudinaryConfig.uploader
    .upload_stream({ folder: folderSite + "/" + folder })
    .end(buffer);

  return fileUpload;
}

// export async function deleteFileFromCloudinary(fileDeleteUrl, folder) {
//   const public_id = fileDeleteUrl?.split("/")?.pop()?.split(".")?.[0];

//   await cloudinaryConfig.uploader.destroy(
//     `${folderSite}/${folder}/` + public_id
//   );
// }
