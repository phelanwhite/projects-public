import { categoriesBlog } from "@/assets/constants";
import Loader from "@/components/common/Loader";
import TextEditor from "@/components/form/text-editor";
import axiosClient from "@/configs/axiosClient";
import { useMessageContext } from "@/contexts/MessageContext";
import { usePostStore } from "@/store/post-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useEffect, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { useParams } from "react-router-dom";

const PostCreateAndUpdatePage = () => {
  const { id } = useParams();
  const [formValue, setFormValue] = useState({
    title: "",
    subTitle: "",
    thumbnail: "",
    categories: [],
    tags: "",
    description: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const postResult = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      if (window.location.pathname.includes(`update`)) {
        const result = await axiosClient.get(`post/get-id/${id}`);
        return result?.data;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (window.location.pathname.includes(`update`)) {
      setFormValue((prev) => ({ ...prev, ...postResult.data?.result }));
      return;
    }
  }, [postResult.data]);

  const { messageApi } = useMessageContext();
  const { createPost, updatePostById } = usePostStore();
  const createAndupdateResult = useMutation({
    mutationFn: async (data: any) => {
      let result;
      if (window.location.pathname.includes(`create`)) {
        result = await createPost(data);
      }
      if (window.location.pathname.includes(`update`)) {
        result = await updatePostById(id as string, data);
      }
      return result;
    },
    onSuccess(data) {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValue).forEach((item) => {
      // item[0] !== "categories" && formData.append(item[0], item[1] as string);
      formData.append(item[0], item[1]);
    });
    // if (formValue.categories.length) {
    //   console.log(formValue.categories);

    //   for (let index = 0; index < formValue.categories?.length; index++) {
    //     const element = formValue.categories[index];
    //     formData.append("categories", element);
    //   }
    // }

    if (file) {
      formData.append("file", file);
    }
    console.log(Array.from(formData));

    createAndupdateResult.mutate(formData);
  };

  if (postResult.isLoading) return <Loader />;
  return (
    <div>
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item label="Thumbnail">
          <label
            htmlFor="files"
            className={[
              `aspect-video w-[150px] rounded overflow-hidden bg-stone-100 flex items-center justify-center`,
            ].join(" ")}
          >
            <input
              className="hidden"
              type="file"
              id="files"
              name="files"
              onChange={(e) => setFile(e.target.files?.[0] as File)}
            />
            {formValue?.thumbnail ? (
              <img
                loading="lazy"
                src={file ? URL.createObjectURL(file) : formValue.thumbnail}
                alt=""
              />
            ) : (
              <div className="flex flex-col gap-2 items-center cursor-pointer font-semibold text-xs capitalize">
                <FaUpload size={20} />
                <div>drag and drop</div>
              </div>
            )}
          </label>
        </Form.Item>
        <Form.Item label="Title">
          <Input
            value={formValue?.title}
            onChange={(e) =>
              setFormValue({ ...formValue, title: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Sub Title">
          <TextArea
            rows={3}
            value={formValue?.subTitle}
            onChange={(e) =>
              setFormValue({ ...formValue, subTitle: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Categories">
          <Select
            mode="multiple"
            options={categoriesBlog}
            defaultValue={formValue?.categories}
            onChange={(e) => setFormValue({ ...formValue, categories: e })}
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextEditor
            value={formValue?.description}
            onChange={(e) => {
              setFormValue((prev) => ({ ...prev, description: e }));
            }}
            // onChange={(e) =>
            //
            // }
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={createAndupdateResult.isPending}
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

export default PostCreateAndUpdatePage;
