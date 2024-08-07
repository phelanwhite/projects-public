import axiosClient from "@/configs/axiosClient";
import { useMessageContext } from "@/contexts/MessageContext";
import { useListStore } from "@/store/list-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useEffect, useState } from "react";
import Loader from "../common/Loader";

const ListForm = ({
  isModalOpen,
  setIsModalOpen,
  idUpdate,
}: {
  isModalOpen: any;
  setIsModalOpen: any;
  idUpdate?: any;
}) => {
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
      if (idUpdate) {
        result = await updateListById(idUpdate, data);
      } else {
        result = await createList(data);
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
    queryKey: ["lists", idUpdate],
    queryFn: async () => {
      const url = `list/get-id/${idUpdate}`;
      if (idUpdate) {
        const result = await axiosClient.get(url);
        return result.data;
      }
      return undefined;
    },
  });
  useEffect(() => {
    if (idUpdate) {
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

    setFormValue({
      title: "",
      description: "",
      status: false,
    });
    handleCancel();
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  if (getListResult.isLoading) return <Loader />;
  return (
    <>
      <Modal
        title="Create new list"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
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
      </Modal>
    </>
  );
};

export default ListForm;
