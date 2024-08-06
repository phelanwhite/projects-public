import Loader from "@/components/common/Loader";
import PostCard from "@/components/common/PostCard";
import { useMessageContext } from "@/contexts/MessageContext";
import { useListStore } from "@/store/list-store";
import { usePostStore } from "@/store/post-store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import { ChangeEvent, useState } from "react";
import { Link, NavLink } from "react-router-dom";

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

const StoriesPage = () => {
  const { getPosts, posts } = usePostStore();
  const getListsByMeResult = useQuery({
    queryKey: ["Published", posts],
    queryFn: async () => {
      const result = await getPosts();
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
          <div className="font-semibold text-2xl">Your Stories</div>
          <Link
            to={`/post-create`}
            onClick={showModal}
            className="px-4 py-1.5 rounded-full hover:bg-green-700 bg-green-600 text-white"
          >
            Wirte
          </Link>
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
            Drafts
          </NavLink>
          <NavLink
            to={``}
            className={({ isActive }) =>
              [`font-semibold text-secondary`, isActive && `text-black`].join(
                " "
              )
            }
          >
            Published
          </NavLink>
          <NavLink
            to={``}
            className={({ isActive }) =>
              [`font-semibold text-secondary`, isActive && `text-black`].join(
                " "
              )
            }
          >
            Responses
          </NavLink>
        </div>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {posts?.map((item: any) => (
            <PostCard
              isColumn={true}
              key={item?._id}
              data={item}
              isAuth={true}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default StoriesPage;
