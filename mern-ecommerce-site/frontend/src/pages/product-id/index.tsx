import { currencyChange } from "@/libs/utils/currency";
import Left from "./Left";
import Rigth from "./Rigth";
import { desc } from "@/assets/data";

const ProductIdPage = () => {
  return (
    <div className="flex items-start gap-6">
      <Left />
      <div className="flex-1 overflow-hidden space-y-4">
        {/* info */}
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="font-semibold text-xl">Apple iPhone 15 Pro Max</div>
          <div className="space-x-2 text-gray-500">
            <span>5.0</span>
            <span>(160)</span>
            <span>|</span>
            <span>Đã bán 1023</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-red-500 font-semibold text-2xl">
              {currencyChange({ value: 28490000 })}
            </span>
            <span className="bg-stone-100 px-1 rounded text-xs inline-block">
              -16%
            </span>
          </div>
          <div>
            <div className="text-base font-semibold mb-2">Số lượng</div>
            <div className="flex flex-wrap gap-2">
              {Array(5)
                .fill(0)
                .map((i, index) => (
                  <button
                    key={index}
                    className="min-w-max flex items-center gap-2"
                  >
                    <div className="aspect-square w-10">
                      <img
                        src="https://salt.tikicdn.com/cache/750x750/ts/product/95/c1/a3/ebaf493be9f3a65768aa2125483f6be5.png.webp"
                        loading="lazy"
                        alt=""
                      />
                    </div>
                    <span>Titan Tự Nhiên, 256GB</span>
                  </button>
                ))}
            </div>
          </div>
        </div>
        {/* Thông tin bảo hành */}
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="text-base font-semibold">Thông tin bảo hành</div>
          <ul>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0">
              <span>Thời gian bảo hành: </span>
              <span className="font-semibold">12 Tháng</span>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0">
              <span>Hình thức bảo hành: </span>
              <span className="font-semibold">Điện tử</span>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0">
              <span>Nơi bảo hành: </span>
              <span className="font-semibold">Bảo hành chính hãng</span>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0">
              <span>Hướng dẫn bảo hành: </span>
              <span className="font-semibold">Xem chi tiết</span>
            </li>
          </ul>
        </div>
        {/* An tâm mua sắm */}
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="text-base font-semibold">An tâm mua sắm</div>
          <ul>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png"
                  alt=""
                />
              </div>
              <div className="flex-1">Được đồng kiểm khi nhận hàng</div>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png"
                  alt=""
                />
              </div>
              <div className="flex-1">Được hoàn tiền 200% nếu là hàng giả.</div>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png"
                  alt=""
                />
              </div>
              <div className="flex-1">
                Đổi trả miễn phí trong 30 ngày khi bạn đổi ý hoặc sản phẩm không
                đúng cam kết.
              </div>
            </li>
          </ul>
        </div>
        {/* Thông tin chi tiết */}
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="text-base font-semibold">Thông tin chi tiết</div>
          <ul>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/c5/37/ee/76c708d43e377343e82baee8a0340297.png"
                  alt=""
                />
              </div>
              <div className="flex-1">Được đồng kiểm khi nhận hàng</div>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/ea/02/b4/b024e431ec433e6c85d4734aaf35bd65.png"
                  alt=""
                />
              </div>
              <div className="flex-1">Được hoàn tiền 200% nếu là hàng giả.</div>
            </li>
            <li className="border-b py-2 first:pt-0 last:border-none last:pb-0 flex items-start gap-2">
              <div className="w-5">
                <img
                  loading="lazy"
                  src="https://salt.tikicdn.com/ts/upload/d8/c7/a5/1cd5bd2f27f9bd74b2c340b8e27c4d82.png"
                  alt=""
                />
              </div>
              <div className="flex-1">
                Đổi trả miễn phí trong 30 ngày khi bạn đổi ý hoặc sản phẩm không
                đúng cam kết.
              </div>
            </li>
          </ul>
        </div>
        {/* Mô tả sản phẩm */}
        <div className="bg-white rounded-lg p-4 space-y-2">
          <div className="text-base font-semibold">Mô tả sản phẩm</div>
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>
        </div>
      </div>
      <div className="max-w-[360px] w-full">
        <Rigth />
      </div>
    </div>
  );
};

export default ProductIdPage;