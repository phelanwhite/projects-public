"use client";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { FaFileUpload } from "react-icons/fa";

interface IUploadAndPreviewImage {
  data?: any;
  onUpload?: (file: File) => void;
}

const UploadAndPreviewImage: FC<IUploadAndPreviewImage> = ({
  data,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (data) {
      setPreview(data);
    }
  }, [data]);

  useEffect(() => {
    if (file) {
      const urlPreview = file && URL.createObjectURL(file);
      setPreview(urlPreview);
      onUpload && onUpload(file);
      return () => URL.revokeObjectURL(urlPreview);
    }
  }, [file]);
  // console.log({ data, preview, file });

  return (
    <div>
      <label
        htmlFor="file"
        className="cursor-pointer relative border w-full max-w-[200px] aspect-video rounded overflow-hidden flex flex-col gap-2 items-center justify-center"
      >
        {preview && !file ? (
          <div>
            <Image fill alt="" src={preview as string} />
          </div>
        ) : (
          <>
            <FaFileUpload size={20} />
            <div className="font-semibold text-xs">Upload Image</div>
          </>
        )}
        {file && preview && (
          <div>
            <Image fill alt="" src={preview as string} />
          </div>
        )}
        <input
          className="hidden"
          id="file"
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] as File)}
        />
      </label>
    </div>
  );
};

export default UploadAndPreviewImage;
