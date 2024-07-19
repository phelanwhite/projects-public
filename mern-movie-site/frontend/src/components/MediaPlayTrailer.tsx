import { FC, memo } from "react";
import { MdClose } from "react-icons/md";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import required modules
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { getTmdbVideoTrailer } from "../services/tmdb";
import Loader from "./loader";

interface IMediaPlayTrailer {
  handleClose?: () => void;
  media_type: string;
  media_id: string;
}

const MediaPlayTrailer: FC<IMediaPlayTrailer> = ({
  media_id,
  media_type,
  handleClose,
}) => {
  const trailer = useQuery({
    queryKey: ["modal", media_type, media_id],
    queryFn: async () => {
      const resp = await getTmdbVideoTrailer(media_id, media_type);
      return resp;
    },
  });
  if (trailer.isLoading) return <Loader />;
  return (
    <div className="bg-black text-white max-w-[1000px] w-full">
      <div className="flex items-center justify-between px-4 py-5">
        <span className="font-semibold text-xl">Play Trailer</span>
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-white text-xl"
        >
          <MdClose />
        </button>
      </div>
      <Swiper
        modules={[Navigation]}
        navigation
        className="h-full w-full"
        slidesPerView={1}
        spaceBetween={0}
      >
        {trailer.data?.results?.map((trailer: any) => (
          <SwiperSlide key={trailer.id}>
            <div className="flex items-center justify-center">
              <iframe
                className="aspect-video w-full h-full"
                src={`https://www.youtube.com/embed/${trailer?.key}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default memo(MediaPlayTrailer);
