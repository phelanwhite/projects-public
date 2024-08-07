import { useMessageContext } from "@/contexts/MessageContext";
import { useListStore } from "@/store/list-store";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import ListForm from "../form/ListForm";

export const ListCardOptions = ({ data }: { data: any }) => {
  const navigate = useNavigate();
  const { messageApi } = useMessageContext();
  const { deleteListById } = useListStore();
  const deleteListByIdResult = useMutation({
    mutationFn: async () => {
      const result = await deleteListById(data?._id);
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
  return (
    <div className="bg-white text-sm shadow-lg py-2 rounded-md border absolute w-[245px] right-0 bottom-0">
      <ul>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Save
          </button>
        </li>
        <li>
          <button
            onMouseDown={() => navigate(`/list-update-id/${data?._id}`)}
            className="hover:bg-stone-100 w-full px-4 py-1 text-left"
          >
            Update list
          </button>
        </li>
        <li>
          <button
            onMouseDown={() => deleteListByIdResult.mutate()}
            className="hover:bg-stone-100 w-full px-4 py-1 text-left"
          >
            Delete list
          </button>
        </li>
        <li>
          <button className="hover:bg-stone-100 w-full px-4 py-1 text-left">
            Report
          </button>
        </li>
      </ul>
    </div>
  );
};

const ListCard = ({ data }: { data: any }) => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <ListForm
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        idUpdate={data?._id}
      />
      <div className="bg-stone-100 rounded-md p-6 space-y-3">
        <Link
          to={`/author/${data?.author?._id}`}
          className="flex items-center gap-2"
        >
          <div className="w-6 h-6 overflow-hidden rounded-full">
            <img src={data?.author?.avatar} alt={data?.author?.avatar} />
          </div>
          <div className="flex-1 line-clamp-1 font-semibold text-sm">
            {data?.author?.username}
          </div>
        </Link>
        <div className="line-clamp-1 font-bold text-xl">
          <Link to={`/list/${data?._id}`}>{data?.title}</Link>
        </div>
        <div className="line-clamp-2 text-secondary italic text-sm font-semibold">
          {data?.description}
        </div>
        <div className="flex items-center justify-between">
          <div className="text-xs text-secondary">
            {data?.status ? `Public` : `Private`}
          </div>
          <div className="relative">
            <button
              onFocus={() => setIsOpenOptions(true)}
              onBlur={() => setIsOpenOptions(false)}
            >
              <HiOutlineDotsHorizontal size={24} />
            </button>
            {isOpenOptions && <ListCardOptions data={data} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default ListCard;
