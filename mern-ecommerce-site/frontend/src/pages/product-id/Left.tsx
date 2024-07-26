// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import Swiper core and required modules
import { Navigation } from "swiper/modules";

const Left = () => {
  return (
    <div className="w-full bg-white rounded-lg p-4 space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden border">
        <img
          src="https://salt.tikicdn.com/cache/750x750/ts/product/95/c1/a3/ebaf493be9f3a65768aa2125483f6be5.png.webp"
          loading="lazy"
          alt=""
        />
      </div>
      <div>
        <Swiper
          navigation
          modules={[Navigation]}
          spaceBetween={8}
          slidesPerView={6}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {Array(20)
            .fill(0)
            .map((i, index) => (
              <SwiperSlide key={index}>
                <div
                  className={[
                    `aspect-square rounded-lg overflow-hidden border p-1 cursor-pointer`,
                    index === 0 && `border-blue-500 border-2`,
                  ].join(" ")}
                >
                  <img
                    src="https://salt.tikicdn.com/cache/750x750/ts/product/95/c1/a3/ebaf493be9f3a65768aa2125483f6be5.png.webp"
                    loading="lazy"
                    alt=""
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div>
        <div className="font-semibold text-base mb-2">Đặc điểm nổi bật</div>
        <div className="space-y-1">
          <div className="flex items-start gap-2">
            <div className="w-4 pt-1">
              <img
                src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex-1">
              Thiết kế titan nhẹ và bền chắc, mặt sau bằng kính nhám và mặt
              trước Ceramic Shield chống tia nước, chống nước và chống bụi.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 pt-1">
              <img
                src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex-1">
              Thiết kế titan nhẹ và bền chắc, mặt sau bằng kính nhám và mặt
              trước Ceramic Shield chống tia nước, chống nước và chống bụi.
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 pt-1">
              <img
                src="https://salt.tikicdn.com/ts/upload/81/61/d4/92e63f173e7983b86492be159fe0cff4.png"
                loading="lazy"
                alt=""
              />
            </div>
            <div className="flex-1">
              Thiết kế titan nhẹ và bền chắc, mặt sau bằng kính nhám và mặt
              trước Ceramic Shield chống tia nước, chống nước và chống bụi.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left;
