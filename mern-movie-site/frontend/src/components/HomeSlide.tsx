// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import Swiper core and required modules
import { Autoplay } from "swiper/modules";
import { getTmdbImage } from "../services/tmdb";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { FaBookmark, FaHeart, FaList, FaPlay } from "react-icons/fa";
import MediaPlayTrailer from "./MediaPlayTrailer";
import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { useAddFavoriteMutation } from "../stores/favoriteApi";
import MyListAddBox from "./MyListAddBox";
import Modal from "./Modal";

const HomeBannerSlide = ({ data }: { data: any[] }) => {
  const [addFavorite] = useAddFavoriteMutation();
  const [isOpenTrailer, setIsOpenTrailer] = useState(false);
  const [mediaTrailer, setMediaTrailer] = useState({
    media_id: "",
    media_type: "",
  });
  const [isOpenMyListBox, setIsOpenMyListBox] = useState(false);
  const [itemAddMyList, setItemAddMyList] = useState({
    id: "",
    type: "",
  });

  return (
    <>
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
      >
        {data.map((item) => (
          <SwiperSlide
            key={item?.id}
            className="h-screen py-16 overflow-hidden"
            style={{
              background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 2)),
            url(${getTmdbImage(item?.backdrop_path)}) no-repeat center/cover`,
            }}
          >
            <div className="wrapper h-full flex items-center">
              <div className="flex items-start gap-8">
                <div className="hidden sm:block rounded-lg overflow-hidden w-full max-w-[300px] lg:max-w-[400px]">
                  <img
                    src={getTmdbImage(item?.poster_path)}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div className="flex-1 text-white space-y-6">
                  <div>
                    <Link
                      to={`/media/${item?.id}?media_type=${item?.media_type}`}
                      className="font-bold text-3xl"
                    >
                      {item?.title || item?.name}
                    </Link>
                    <div className="mt-1 line-clamp-1 text-sm flex gap-4 text-gray-300 italic">
                      <span>
                        Date: {item?.release_date || item?.first_air_date}
                      </span>
                      <span>Popularity: {item?.popularity}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-[rgb(8,28,34)] w-14 h-14 overflow-hidden rounded-full">
                      <CircularProgressbar
                        value={item?.vote_average * 10}
                        text={`${Math.round(Number(item?.vote_average) * 10)}%`}
                        styles={buildStyles({
                          textColor: `white`,
                          textSize: `24px`,
                          pathColor: `rgb(22, 163, 74, 1)`,
                          trailColor: `rgba(229, 231, 235, 1)`,
                          backgroundColor: `#081C22`,
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <div className="w-min font-semibold">User Score</div>
                    <button className="bg-[rgb(3,37,65)] ml-2 text-sm px-4 py-2 rounded-full font-semibold hover:scale-105 transition">
                      What's your Vibe ?
                    </button>
                  </div>

                  <div className="flex items-center gap-4 text-xs">
                    <button
                      onClick={() => {
                        setIsOpenMyListBox(true);
                        setItemAddMyList({
                          id: item?.id,
                          type: item?.media_type,
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
                          favouriteId: item?.id,
                          favouriteType: item?.media_type,
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
                    <button
                      onClick={() => {
                        setIsOpenTrailer(true);
                        setMediaTrailer({
                          media_id: item?.id,
                          media_type: item?.media_type,
                        });
                      }}
                      className="flex items-center gap-1 hover:text-gray-500"
                    >
                      <FaPlay />
                      <span className="font-semibold text-base">
                        Play Trailer
                      </span>
                    </button>
                  </div>
                  <div className="">
                    <div className="font-semibold text-xl capitalize mb-1">
                      overview
                    </div>
                    <div className="italic text-gray-300">{item?.overview}</div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Modal open={isOpenTrailer} onClose={() => setIsOpenTrailer(false)}>
        <MediaPlayTrailer
          handleClose={() => setIsOpenTrailer(false)}
          media_id={mediaTrailer.media_id}
          media_type={mediaTrailer.media_type}
        />
      </Modal>
      <Modal open={isOpenMyListBox} onClose={() => setIsOpenMyListBox(false)}>
        <MyListAddBox
          handleClose={() => setIsOpenMyListBox(false)}
          itemData={itemAddMyList}
        />
      </Modal>
    </>
  );
};

export default memo(HomeBannerSlide);
