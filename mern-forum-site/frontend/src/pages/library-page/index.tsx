import ListCard from "@/components/common/ListCard";
import Loader from "@/components/common/Loader";
import { useMessageContext } from "@/contexts/MessageContext";
import { useListStore } from "@/store/list-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";
import { NavLink } from "react-router-dom";

const ListForm = ({
  isModalOpen,
  setIsModalOpen,
}: {
  isModalOpen: any;
  setIsModalOpen: any;
}) => {
  const { messageApi } = useMessageContext();
  const { createList } = useListStore();
  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    status: false,
  });
  const createAndUpdateResult = useMutation({
    mutationFn: async (data: any) => {
      const result = await createList(data);
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
              {formValue.status ? `Make list private` : `Make list public`}
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

const LibraryPage = () => {
  const { getListsByMe, lists } = useListStore();
  const getListsByMeResult = useQuery({
    queryKey: ["getListsByMe", lists],
    queryFn: async () => {
      const result = await getListsByMe();
      return result;
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  if (getListsByMeResult.isLoading) return <Loader />;
  return (
    <>
      <ListForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-2xl">Your library</div>
          <button
            onClick={showModal}
            className="px-4 py-1.5 rounded-full hover:bg-green-700 bg-green-600 text-white"
          >
            New list
          </button>
        </div>
        <div className="flex items-center gap-4">
          <NavLink
            to={``}
            className={({ isActive }) =>
              [`font-semibold text-secondary`, isActive && `text-black`].join(
                " "
              )
            }
          >
            Your list
          </NavLink>
          <NavLink
            to={``}
            className={({ isActive }) =>
              [`font-semibold text-secondary`, isActive && `text-black`].join(
                " "
              )
            }
          >
            Saved lists
          </NavLink>
          <NavLink
            to={``}
            className={({ isActive }) =>
              [`font-semibold text-secondary`, isActive && `text-black`].join(
                " "
              )
            }
          >
            History
          </NavLink>
        </div>
        <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
          {lists?.map((item: any) => (
            <ListCard key={item?._id} data={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default LibraryPage;
