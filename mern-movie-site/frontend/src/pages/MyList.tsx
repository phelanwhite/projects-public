import { useState } from "react";
import MyListForm from "../components/MyListForm";
import { useGetmyListQuery } from "../stores/myListApi";
import MyListCard from "../components/MyListCard";
import Modal from "../components/Modal";

const MyList = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const getMyList = useGetmyListQuery(``);

  return (
    <>
      <div className="wrapper my-10 space-y-8">
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">My List</div>
          <button
            onClick={() => setIsOpenForm(true)}
            className="px-3 py-1 rounded-md text-white bg-purple-600 hover:bg-purple-500"
          >
            Create list
          </button>
        </div>
        <div className=" grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {getMyList.data?.length > 0 ? (
            getMyList.data?.map((item: any) => (
              <MyListCard key={item?._id} data={item} />
            ))
          ) : (
            <div className="text-gray-500">You don't have any listings yet</div>
          )}
        </div>
      </div>
      <Modal open={isOpenForm} onClose={() => setIsOpenForm(false)}>
        <MyListForm handleClose={() => setIsOpenForm(false)} />
      </Modal>
    </>
  );
};

export default MyList;
