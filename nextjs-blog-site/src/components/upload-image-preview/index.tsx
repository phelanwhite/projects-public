"use client";
import Image from "next/image";
import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";

interface IUploadImagePreview {
  dataList?: any[];
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
  handleChange?: (file: FileList) => void;
  handleImageLoad?: (event: React.FormEvent<HTMLFormElement>) => void;
  handleImageSelect?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const UploadImagePreview: FC<
  InputHTMLAttributes<HTMLInputElement> & IUploadImagePreview
> = ({
  dataList,
  handleDelete,
  handleEdit,
  handleChange,
  handleImageLoad,
  handleImageSelect,
  ...props
}) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [previews, setPreviews] = useState<string[] | null>(null);

  useEffect(() => {
    if (files && files?.length > 0) {
      const previewsArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviews(previewsArray);
      handleChange && handleChange(files);
    }
  }, [files]);

  return (
    <div className="flex flex-wrap gap-2">
      {previews &&
        previews.map((item) => (
          <div
            key={item}
            className="relative aspect-video w-[150px] rounded overflow-hidden"
          >
            <Image fill alt="" src={item} loading="lazy" />
          </div>
        ))}

      <label
        htmlFor="files"
        className="aspect-video w-[150px] rounded overflow-hidden bg-stone-100 flex items-center justify-center"
      >
        <input
          className="hidden"
          type="file"
          id="files"
          name="files"
          onChange={(e) => setFiles(e.target.files)}
          {...props}
        />
        <div className="flex flex-col gap-2 items-center cursor-pointer font-semibold text-xs capitalize">
          <FaUpload size={20} />
          <div>drag and drop</div>
        </div>
      </label>
    </div>
  );
};

export default UploadImagePreview;
