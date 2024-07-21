// "use server";

import { uploadImageToCloudinary } from "@/configs/cloudinary";

export async function addBlog(formValue: Object, file?: File) {
  console.log({ formValue });
  console.log({ file });

  //   if (file) {
  //     const img = await uploadImageToCloudinary(file);
  //     console.log({ img });
  //   }
}

export async function uploadFile(file: FileList | File) {}
