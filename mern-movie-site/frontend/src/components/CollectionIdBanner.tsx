import { memo, useState } from "react";
import Modal from "./Modal";
import MyListAddBox from "./MyListAddBox";
import { FaBookmark, FaHeart, FaList } from "react-icons/fa";
import { useAddFavoriteMutation } from "../stores/favoriteApi";
import { getTmdbImage } from "../services/tmdb";

const CollectionIdBanner = ({ data }: { data: any }) => {
  const [addFavorite] = useAddFavoriteMutation();
  const [isOpenMyListBox, setIsOpenMyListBox] = useState(false);
  const [itemAddMyList, setItemAddMyList] = useState({
    id: "",
    type: "",
  });
  return (
    <>
      <div
        className="min-h-screen text-white flex items-center justify-center py-16"
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
                url(${getTmdbImage(
                  data?.backdrop_path
                )}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper h-full flex flex-col md:flex-row md:items-start gap-8">
          <div className="rounded-lg overflow-hidden w-full md:max-w-[300px] aspect-thumbnail">
            <img src={getTmdbImage(data?.poster_path)} alt="" loading="lazy" />
          </div>
          <div className="flex-1 text-white space-y-6">
            <div className="text-3xl font-bold">
              {data?.name || data?.title}
            </div>
            <div className="flex items-center gap-4 text-xs">
              <button
                onClick={() => {
                  setIsOpenMyListBox(true);
                  setItemAddMyList({
                    id: data?.id,
                    type: `collection`,
                  });
                }}
                title="Add to list"
                className="bg-[rgb(3,37,65)] text-white rounded-full w-12 h-12 overflow-hidden flex items-center justify-center"
              >
                <FaList />
              </button>
              <button
                onClick={() => {
                  addFavorite({
                    favouriteId: data.id,
                    favouriteType: `collection`,
                  });
                }}
                title="Marks as favorite"
                className="bg-[rgb(3,37,65)] text-white rounded-full w-12 h-12 overflow-hidden flex items-center justify-center"
              >
                <FaHeart />
              </button>
              <button
                title="Add to your watchlist"
                className="bg-[rgb(3,37,65)] text-white rounded-full w-12 h-12 overflow-hidden flex items-center justify-center"
              >
                <FaBookmark />
              </button>
            </div>
            <div>
              <span>Overview: </span>
              <span>{data?.overview}</span>
            </div>
          </div>
        </div>
      </div>

      <Modal open={isOpenMyListBox} onClose={() => setIsOpenMyListBox(false)}>
        <MyListAddBox
          handleClose={() => setIsOpenMyListBox(false)}
          itemData={itemAddMyList}
        />
      </Modal>
    </>
  );
};

export default memo(CollectionIdBanner);
