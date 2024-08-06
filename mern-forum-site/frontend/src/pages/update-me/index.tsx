import Loader from "@/components/common/Loader";
import axiosClient from "@/configs/axiosClient";
import { useMessageContext } from "@/contexts/MessageContext";
import { useAuthStore } from "@/store/auth-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useEffect, useState } from "react";

const UpdateMePage = () => {
  const getProfileResult = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const url = `auth/profile`;
      const result = await axiosClient.get(url);
      return result.data;
    },
  });
  useEffect(() => {
    setFormValue(getProfileResult.data?.result);
  }, [getProfileResult.data]);

  const { messageApi } = useMessageContext();
  const { updateMe } = useAuthStore();
  const updateMeResult = useMutation({
    mutationFn: async (data: any) => {
      const result = await updateMe(data);
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
  const [formValue, setFormValue] = useState({
    username: "",
    phone: "",
    avatar: "",
    address: "",
    bio: "",
    job: "",
    website: "",
  });
  const [files, setFiles] = useState<FileList | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    if (files?.length) {
      const reader = new FileReader();
      reader.readAsDataURL(files?.[0] as File);
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
    }
  }, [files]);

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formValue).forEach((item) =>
      formData.append(item[0], item[1] as string)
    );
    formData.append("file", files?.[0] as File);

    updateMeResult.mutate(formData);
  };
  if (getProfileResult.isLoading) return <Loader />;
  return (
    <div>
      <Form onSubmitCapture={handleSubmit} layout="vertical">
        <Form.Item>
          <label
            htmlFor="file"
            className="mx-auto max-w-max cursor-pointer block"
          >
            <input
              className="hidden"
              type="file"
              id="file"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
            <div className="w-36 h-36 overflow-hidden rounded-full border relative">
              <img
                src={preview ? (preview as string) : formValue?.avatar}
                loading="lazy"
                alt=""
              />
            </div>
          </label>
        </Form.Item>
        <Form.Item label="User name">
          <Input
            value={formValue?.username || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, username: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Input
            value={formValue?.phone || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, phone: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Address">
          <Input
            value={formValue?.address || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, address: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Website">
          <Input
            value={formValue?.website || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, website: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Job">
          <Input
            value={formValue?.job || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, job: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Bio">
          <TextArea
            rows={5}
            value={formValue?.bio || ""}
            onChange={(e) =>
              setFormValue({ ...formValue, bio: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <Button
            loading={updateMeResult.isPending}
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

export default UpdateMePage;
