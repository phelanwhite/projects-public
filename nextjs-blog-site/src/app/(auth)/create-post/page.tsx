"use client";
import Loader from "@/components/Loader";
import TextEditor from "@/components/text-editor";
import UploadImagePreview from "@/components/upload-image-preview";
import { uploadFile } from "@/configs/cloudinary";
import { categoriesBlog } from "@/data/constants";
import { usePostStore } from "@/stores/post-store";
import { useMutation } from "@tanstack/react-query";
import { Button, Form, FormProps, Input, message, Select } from "antd";
import React, { useState } from "react";

const CreatePost = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { createPost } = usePostStore();
  const [files, setFiles] = useState<FileList | null>(null);

  const createPostResult = useMutation({
    mutationFn: async (data: PostType) => {
      let thumbnail = "";
      if (files && files?.length > 0) {
        const formData = new FormData();
        formData.append("file", files?.[0]);
        thumbnail = (await uploadFile(formData)) as string;
      }

      createPost({
        ...data,
        thumbnail: thumbnail as string,
      });
    },
    onSuccess: () => {
      messageApi.open({
        type: "success",
        content: "Post created successfully!",
      });
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: error.message?.toString(),
      });
    },
  });

  const onFinish: FormProps<PostType>["onFinish"] = (values) => {
    createPostResult.mutate(values);
  };

  const onFinishFailed: FormProps<PostType>["onFinishFailed"] = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if (createPostResult.isPending) return <Loader />;

  return (
    <div>
      {contextHolder}
      <Form
        initialValues={{
          title: "",
          thumbnail: "",
          categories: [],
          description: "",
        }}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Thumbnail">
          <UploadImagePreview handleChange={(e) => setFiles(e)} />
        </Form.Item>

        <Form.Item
          name={"title"}
          label="Title"
          rules={[{ required: true, message: "Please input a title" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name={"categories"}
          label="Categories"
          rules={[{ required: true, message: "Please input a categories" }]}
        >
          <Select mode="multiple" allowClear options={categoriesBlog} />
        </Form.Item>

        <Form.Item
          name={"description"}
          label="Description"
          rules={[{ required: true, message: "Please input a description" }]}
        >
          <TextEditor />
        </Form.Item>

        <Form.Item>
          <Button
            disabled={createPostResult.isPending}
            type="primary"
            htmlType="submit"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default CreatePost;
