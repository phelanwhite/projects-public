import { memo, useState } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDeleteMyListMutation } from "../stores/myListApi";
import MyListForm from "./MyListForm";
import Modal from "./Modal";

const MyListCard = ({ data }: { data: any }) => {
  const [deleteMyList] = useDeleteMyListMutation();
  const [isOptions, setIsOptions] = useState(false);
  const [isOpenForm, setIsOpenForm] = useState(false);
  return (
    <>
      <div className="relative aspect-video rounded-md overflow-hidden bg-[rgb(46,74,96)] text-white flex items-center justify-center text-center">
        <div className="absolute top-4 right-4">
          <button
            onFocus={() => setIsOptions(true)}
            onBlur={() => setIsOptions(false)}
          >
            <HiOutlineDotsVertical />
          </button>
          {isOptions && (
            <div className="absolute top-0 right-4 text-xs bg-white shadow text-black overflow-hidden rounded">
              <button
                onMouseDown={() => setIsOpenForm(true)}
                className="w-full flex items-center gap-2 px-4 py-2 font-semibold hover:bg-stone-100"
              >
                <MdEdit />
                Edit
              </button>
              <button
                onMouseDown={() => deleteMyList(data?._id)}
                className="w-full flex items-center gap-2 px-4 py-2 font-semibold hover:bg-stone-100"
              >
                <MdDelete />
                Delete
              </button>
            </div>
          )}
        </div>
        <div className="p-4">
          <Link
            to={data?._id}
            className="font-semibold italic text-[18px] line-clamp-1 hover:text-blue-500 hover:underline"
          >
            {data?.title}
          </Link>
          <div className="italic text-sm">{data?.items?.length || 0} item</div>
          <div className="text-gray-400 text-sm line-clamp-2">
            {data?.description}
          </div>
        </div>
      </div>
      <Modal open={isOpenForm} onClose={() => setIsOpenForm(false)}>
        <MyListForm
          handleClose={() => setIsOpenForm(false)}
          isEdit={isOpenForm}
          idEdit={isOpenForm ? data?._id : ``}
        />
      </Modal>
    </>
  );
};

export default memo(MyListCard);
