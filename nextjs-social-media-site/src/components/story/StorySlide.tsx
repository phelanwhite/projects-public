"use client";
import React from "react";
import StoryButtonAdd from "./StoryButtonAdd";
import StoryCard from "./StoryCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

const StorySlide = () => {
  return (
    <div className="bg-white shadow rounded p-4">
      <Swiper
        spaceBetween={8}
        slidesPerView={2}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          // 768: {
          //   slidesPerView: 3,
          // },
          1024: {
            slidesPerView: 4,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
      >
        <SwiperSlide>
          <StoryButtonAdd />
        </SwiperSlide>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <SwiperSlide key={i}>
              <StoryCard />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default StorySlide;
