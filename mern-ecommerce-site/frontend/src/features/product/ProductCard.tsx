import { currencyChange } from "@/libs/utils/currency";
import { Link } from "react-router-dom";

const ProductCard = () => {
  return (
    <Link
      to={`/product-id`}
      className="block shadow-sm hover:shadow border rounded-md bg-white text-gray-500 hover:text-gray-500"
    >
      <div className="aspect-square">
        <img
          src="https://salt.tikicdn.com/cache/280x280/ts/product/95/c1/a3/ebaf493be9f3a65768aa2125483f6be5.png.webp"
          alt=""
          loading="lazy"
        />
      </div>
      <div className="p-2 space-y-2">
        <div className="line-clamp-2 h-[42px] text-black">
          Kem chống nắng dạng sữa dịu nhẹ cho da nhạy cảm và trẻ em Anessa
          Perfect UV Sunscreen Mild Milk For Sensitive Skin SPF 50+ PA++++ 60ml
        </div>
        {/* <ReactRating  initialRating={4} /> */}
        <div className="text-red-500 font-semibold text-xl">
          {currencyChange({ value: 120000000 })}
        </div>
        <div className="space-x-2">
          <span className="bg-stone-100 text-xs rounded px-1 ">-9%</span>
          <span className="line-through text-xs">
            {currencyChange({ value: 120000000 })}
          </span>
        </div>
        <div className="text-xs">Made in Janpan</div>
        <div className="border-t pt-2 text-xs">{new Date().toDateString()}</div>
      </div>
    </Link>
  );
};

export default ProductCard;
