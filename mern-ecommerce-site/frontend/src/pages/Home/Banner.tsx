// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import Swiper core and required modules
import { Autoplay } from "swiper/modules";

const Banner = () => {
  return (
    <Swiper
      spaceBetween={8}
      slidesPerView={2}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Autoplay]}
      className="mySwiper"
    >
      {Array(9)
        .fill(0)
        .map((_, index) => (
          <SwiperSlide key={index}>
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden aspect-video">
              <img
                src={`https://salt.tikicdn.com/cache/w750/ts/tikimsp/07/88/c3/16bf92c20307706701b8437a7811515a.jpg.webp`}
                alt=""
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default Banner;
