import { IoIosCloseCircle } from "react-icons/io";
import {
  useAddItemToMyListMutation,
  useGetmyListQuery,
} from "../stores/myListApi";
import MyListForm from "./MyListForm";
import { memo, useState } from "react";
import Modal from "./Modal";
const MyListAddBox = ({
  handleClose,
  itemData,
}: {
  handleClose: () => void;
  itemData: any;
}) => {
  const getMyList = useGetmyListQuery(``);
  const [addItemToMyList] = useAddItemToMyListMutation();
  const [isForm, setIsForm] = useState(false);

  return (
    <>
      <div className="relative flex flex-col gap-4 max-w-[600px] w-full mx-auto rounded-md bg-white py-4">
        <button
          onClick={handleClose}
          type="button"
          className="absolute top-4 right-4"
        >
          <IoIosCloseCircle size={20} />
        </button>
        <div className="px-4">
          <button
            onClick={() => setIsForm(true)}
            className="px-3 py-1.5 rounded text-white text-sm bg-purple-600 hover:bg-purple-500"
          >
            Create new list
          </button>
        </div>
        <div>
          <div className="font-semibold px-4">Your List</div>
          <div className="max-h-[300px] overflow-y-auto">
            {getMyList.data?.length > 0 ? (
              getMyList.data?.map((item: any) => (
                <div
                  onClick={() =>
                    addItemToMyList({
                      id: item?._id,
                      data: { id: itemData?.id, type: itemData?.type },
                    })
                  }
                  className="cursor-pointer block w-full hover:bg-gray-100 px-4 py-2 rounded-md"
                  key={item?._id}
                >
                  {item?.title}
                </div>
              ))
            ) : (
              <div className="text-sm px-4 text-gray-500">
                You don't have any listings yet
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal open={isForm} onClose={() => setIsForm(false)}>
        <MyListForm handleClose={() => setIsForm(false)} />
      </Modal>
    </>
  );
};

export default memo(MyListAddBox);
