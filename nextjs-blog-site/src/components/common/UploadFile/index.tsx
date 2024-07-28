"use client";

import { uploadFileToCloudinary } from "@/app/configs/cloudinary";
import env from "@/app/configs/env";
import { Button } from "antd";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UploadFile = () => {
  // const [files, setFiles] = useState<FileList | null>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[] | null>(null);

  // useEffect(() => {
  //   if (files) {
  //     const array = Array.from(files);
  //     const previewsArray = array.map((file) => URL.createObjectURL(file));
  //     setPreviews(previewsArray);
  //   }
  // }, [files]);

  const handleUpload = async () => {
    // const formData = new FormData();

    // if (files?.length) {
    //   Array.from(files).forEach((file) => {
    //     formData.append("file", file);
    //   });
    //   formData.append(`upload_preset`, `nextjs-blog-site`);
    // }
    // console.log(Array.from(formData));

    // const url = `https://api.cloudinary.com/v1_1/${env.CLOUDINARY_NAME}/image/upload`;
    // const resp = await (await axios.post(url, formData)).data;
    // console.log({ resp });

    const resp = files ? await uploadFileToCloudinary(files[0]) : null;
    console.log({ resp });
  };

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {previews &&
          previews.map((preview, index) => (
            <div
              key={index}
              className="relative aspect-video max-w-[150px] w-full rounded overflow-hidden"
            >
              <Image src={preview} alt="" fill />
            </div>
          ))}
      </div>
      <input type="file" multiple onChange={(e) => setFiles(e.target.files)} />

      <div>
        <Button onClick={() => handleUpload()} type="primary" htmlType="submit">
          Upload
        </Button>
      </div>
    </div>
  );
};

export default UploadFile;
