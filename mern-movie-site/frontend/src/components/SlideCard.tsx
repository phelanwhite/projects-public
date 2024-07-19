// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import required modules
import { Grid, Pagination } from "swiper/modules";

import MediaCard from "./MediaCard";
import CharacterCard from "./CharacterCard";
import PersonCard from "./PersonCard";
import { memo } from "react";

const SlideCard = ({
  data,
  title,
  media_type,
  rows,
}: {
  title?: string;
  data?: any[];
  media_type?: string;
  rows?: number;
}) => {
  return (
    <div>
      <div className="capitalize text-xl font-semibold border-l-4 border-green-500 pl-4 mb-4">
        {title}
      </div>
      <div>
        <Swiper
          grid={{
            rows: rows || 1,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Pagination]}
          spaceBetween={8}
          slidesPerView={2}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 5,
            },
            1280: {
              slidesPerView: 6,
            },
            1536: {
              slidesPerView: 7,
            },
          }}
        >
          {data?.map((item) => {
            if (media_type === "person") {
              return (
                <SwiperSlide key={item?.id}>
                  <PersonCard data={item} />
                </SwiperSlide>
              );
            } else if (media_type === "character") {
              return (
                <SwiperSlide key={item?.id}>
                  <CharacterCard data={item} />
                </SwiperSlide>
              );
            } else {
              return (
                <SwiperSlide key={item?.id}>
                  <MediaCard
                    data={item}
                    media_type={item?.media_type || media_type}
                  />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default memo(SlideCard);
