import ButtonIncrementDecrement from "@/components/ButtonIncrementDecrement";
import { currencyChange } from "@/libs/utils/currency";
import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const Rigth = () => {
  return (
    <div className="bg-white rounded-lg p-4 space-y-4">
      <div className="flex items-center gap-4">
        <div className="aspect-square rounded-lg overflow-hidden w-10">
          <img
            src="https://salt.tikicdn.com/cache/750x750/ts/product/95/c1/a3/ebaf493be9f3a65768aa2125483f6be5.png.webp"
            loading="lazy"
            alt=""
          />
        </div>
        <div className="flex-1 text-base">Titan Tự Nhiên, 256GB</div>
      </div>
      <div>
        <div className="text-base font-semibold mb-2">Số lượng</div>
        <ButtonIncrementDecrement min={1} number={1} />
      </div>
      <div>
        <div className="text-base font-semibold mb-1">Tạm tính</div>
        <div className=" text-red-500 text-2xl font-semibold">
          {currencyChange({ value: 12321111 })}
        </div>
      </div>
      <div className="space-y-2">
        <Link to={`/`}>
          <Button block danger type="primary">
            Mua ngay
          </Button>
        </Link>
        <Button block type="primary">
          Thêm vào giỏ
        </Button>
      </div>
    </div>
  );
};

export default Rigth;
