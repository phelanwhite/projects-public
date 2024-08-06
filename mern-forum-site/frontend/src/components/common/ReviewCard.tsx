import React from "react";

const ReviewCard = () => {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 overflow-hidden rounded-full">
        <img
          loading="lazy"
          src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*YN7o1xnDKw2QFXC1.jpg"
          alt=""
        />
      </div>
      <div className="flex-1 rounded bg-stone-100 px-4">
        <div className="border-b py-1">hello</div>
        <div className="py-1">Truyện hay ko ae</div>
      </div>
    </div>
  );
};

export default ReviewCard;
