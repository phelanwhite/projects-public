import Loader from "@/components/common/Loader";
import axiosClient from "@/configs/axiosClient";
import { useMessageContext } from "@/contexts/MessageContext";
import { useListStore } from "@/store/list-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ListCreateAndUpdatePage = () => {
  const { id } = useParams();
  const { messageApi } = useMessageContext();
  const { createList, updateListById } = useListStore();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    status: false,
  });
  const createAndUpdateResult = useMutation({
    mutationFn: async (data: any) => {
      let result;
      if (window.location.pathname.includes(`create`)) {
        result = await createList(data);
      }
      if (window.location.pathname.includes(`update`)) {
        result = await updateListById(id as string, data);
      }
      return result;
    },
    onSuccess: (data: any) => {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
    },
    onError: (error: any) => {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  const getListResult = useQuery({
    queryKey: ["lists", id],
    queryFn: async () => {
      if (window.location.pathname.includes(`update`)) {
        const result = await axiosClient.get(`list/get-id/${id}`);
        return result?.data;
      } else {
        return null;
      }
    },
  });

  useEffect(() => {
    if (window.location.pathname.includes(`update`)) {
      setFormValue((prev) => ({ ...prev, ...getListResult.data?.result }));
    }
  }, [getListResult.data]);
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    createAndUpdateResult.mutate(formValue);
  };

  if (getListResult.isLoading) return <Loader />;
  return (
    <div>
      <div className="mb-8 font-semibold text-secondary text-xl">
        {window.location.pathname.includes(`create`)
          ? `Create List`
          : `Update List`}
      </div>
      <Form onSubmitCapture={handleSubmit}>
        <Form.Item>
          <Input
            required
            placeholder="Title"
            name="title"
            value={formValue.title}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <TextArea
            rows={5}
            placeholder="Description"
            name="description"
            value={formValue.description}
            onChange={handleInputChange}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            checked={formValue.status}
            onChange={() =>
              setFormValue({ ...formValue, status: !formValue.status })
            }
          >
            Make list public
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            loading={createAndUpdateResult.isPending}
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ListCreateAndUpdatePage;
