import React from "react";
import { PostCard } from "@/components/store/product/ProductCard";
import UploadFile from "@/components/common/UploadFile";

const HomePage = () => {
  return (
    <div>
      <UploadFile />
      <div className="lg:max-w-[66%]">
        <div>
          {Array(20)
            .fill(0)
            .map((item, index) => (
              <div key={index} className="border-b pb-8 mb-8">
                <PostCard />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
