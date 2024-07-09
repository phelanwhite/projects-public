import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import { FaLocationArrow } from "react-icons/fa";
import {
  getHour12,
  getIconWeather,
  temperatureChangeC,
} from "../utils/commons";

const ForecastListWeather = ({ data }) => {
  return (
    <div>
      <Swiper
        spaceBetween={8}
        breakpoints={{
          300: {
            slidesPerView: 3,
          },
          440: {
            slidesPerView: 4,
          },
          640: {
            slidesPerView: 6,
          },
          768: {
            slidesPerView: 7,
          },
          1024: {
            slidesPerView: 9,
          },
          1200: {
            slidesPerView: 12,
          },
        }}
      >
        {data?.list?.map((item) => (
          <SwiperSlide key={item.dt}>
            <div className="flex flex-col gap-2">
              <div className="px-4 py-2 rounded bg-[--darkColor2] flex flex-col gap-2 items-center">
                <div className="text-secondary text-xs">
                  {getHour12(item?.dt_txt, false)}
                </div>
                <div>
                  <img
                    src={getIconWeather(item?.weather?.[0]?.icon)}
                    loading="lazy"
                    alt=""
                  />
                </div>
                <div>
                  {temperatureChangeC(item?.main?.temp)}
                  <sup>o</sup>
                </div>
              </div>

              <div className="px-4 py-2 rounded bg-[--darkColor2] flex flex-col gap-6 items-center">
                <div className="text-secondary text-xs">
                  {getHour12(item?.dt_txt, false)}
                </div>
                <div
                  style={{
                    rotate: `${item?.wind?.deg - 45}deg`,
                  }}
                >
                  <FaLocationArrow size={28} className="text-blue-500" />
                </div>
                <div>{item?.wind?.speed}</div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ForecastListWeather;
