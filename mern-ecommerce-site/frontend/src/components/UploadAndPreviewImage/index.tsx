import React, { FC, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd";
import type { GetProp, UploadFile, UploadProps } from "antd";

interface IUploadAndPreviewImage {
  dataList?: string[];
  onChange?: (fileList: UploadFile[]) => void;
  upload?: UploadProps;
}

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadAndPreviewImage: FC<IUploadAndPreviewImage> = ({
  dataList,
  onChange,
  upload,
}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>(() => {
    const imageList =
      dataList?.map((item, index) => {
        const newImage: UploadFile = {
          uid: String(index),
          name: "image.png",
          url: item,
        };
        return newImage;
      }) || [];

    return imageList;
  });

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  useEffect(() => {
    if (fileList && fileList.length > 0) {
      onChange && onChange(fileList);
    }
  }, [fileList, onChange]);

  const UploadButton = () => (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );
  return (
    <>
      <Upload
        multiple
        beforeUpload={() => {
          return false;
        }}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        {...upload}
      >
        <UploadButton />
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadAndPreviewImage;
