"use client";
import Image from "next/image";
import React, { FC, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDateRange, MdOutlineBookmarkAdd } from "react-icons/md";

interface IBlogCard {
  isColumn?: boolean;
  data?: any;
}

const BlogCardFooter = ({ data }: { data: any }) => {
  return <></>;
};

const BlogCardOptions = () => {
  return (
    <div className="absolute right-0 top-full mt-4 w-[250px] shadow-lg rounded-md border p-4 text-sm font-medium space-y-2 z-10 bg-white text-black">
      <button className="block hover:text-gray-500">Show more</button>
      <button className="block hover:text-gray-500">Show less</button>
      <hr />
      <button className="block hover:text-gray-500">Follow author</button>
      <button className="block hover:text-gray-500">Follow publication</button>
      <hr />
      <button className="block hover:text-gray-500">Mute author</button>
      <button className="block hover:text-gray-500">Mute publication</button>
      <button className="block text-red-500 hover:text-gray-500">
        Report story
      </button>
    </div>
  );
};

const BlogCard: FC<IBlogCard> = ({ data, isColumn }) => {
  const [isOptions, setIsOptions] = useState(false);
  return (
    <div
      className={[isColumn ? `flex-col-reverse gap-4` : `gap-10 `].join(" ")}
    >
      {/* author */}
      <div className="flex items-center gap-2 text-xs">
        <div className="relative w-5 h-5 overflow-hidden rounded-full">
          <Image fill alt="" src={data?.author?.avatar} />
        </div>
        <div className="font-semibold flex-1">{data?.author?.name}</div>
      </div>
      <div className="mt-4 flex items-start gap-10">
        <div className="flex-1 space-y-4">
          {/* blog */}
          <div
            className={[
              `text-xl line-clamp-2 font-semibold overflow-hidden`,
              isColumn && `text-base h-12`,
            ].join(" ")}
          >
            {data?.title}
          </div>
          <div
            className={[
              `text-gray-500 font-medium line-clamp-3`,
              isColumn && `text-sm h-[60px]`,
            ].join(" ")}
          >
            {data?.content}
          </div>
          {/* footer */}
          <div className="text-gray-500 flex items-center justify-between gap-8 text-xs">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <MdDateRange />
                <span>
                  {Intl.DateTimeFormat(`vn-VN`, {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }).format(new Date(data?.create_at))}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <AiFillLike />
                <span>{data?.count_like}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCommentAlt />
                <span>{data?.count_comment}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button>
                <MdOutlineBookmarkAdd size={24} />
              </button>
              <div className="relative">
                <button
                  onFocus={() => setIsOptions(true)}
                  onBlur={() => setIsOptions(false)}
                >
                  <HiOutlineDotsHorizontal size={24} />
                </button>
                {isOptions && <BlogCardOptions />}
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            `relative w-full aspect-video min-w-[80px]`,
            isColumn ? `w-full` : ` max-w-[160px]`,
          ].join(" ")}
        >
          <Image fill alt="" src={data?.thumbnail} />
        </div>
      </div>
    </div>
  );
};

export const BlogCardColumn: FC<IBlogCard> = ({ data }) => {
  const [isOptions, setIsOptions] = useState(false);
  return (
    <div className={[`flex items-start flex-col-reverse gap-4`].join(" ")}>
      <div className="flex-1 space-y-4">
        {/* author */}
        <div className="flex items-center gap-2 text-xs">
          <div className="relative w-5 h-5 overflow-hidden rounded-full">
            <Image fill alt="" src={data?.author?.avatar} />
          </div>
          <div className="font-semibold flex-1">{data?.author?.name}</div>
        </div>
        {/* blog */}
        <div
          className={[
            `line-clamp-2 font-semibold overflow-hidden text-base h-12`,
          ].join(" ")}
        >
          {data?.title}
        </div>
        <div
          className={[
            `text-gray-500 font-medium line-clamp-3 text-sm h-[60px]`,
          ].join(" ")}
        >
          {data?.content}
        </div>
        {/* footer */}
        <div className="text-gray-500 flex items-center justify-between gap-8 text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <MdDateRange />
              <span>
                {Intl.DateTimeFormat(`vn-VN`, {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(data?.create_at))}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <AiFillLike />
              <span>{data?.count_like}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaCommentAlt />
              <span>{data?.count_comment}</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button>
              <MdOutlineBookmarkAdd size={24} />
            </button>
            <div className="relative">
              <button
                onFocus={() => setIsOptions(true)}
                onBlur={() => setIsOptions(false)}
              >
                <HiOutlineDotsHorizontal size={24} />
              </button>
              {isOptions && <BlogCardOptions />}
            </div>
          </div>
        </div>
      </div>
      <div className={[`relative w-full aspect-video min-w-[80px]`].join(" ")}>
        <Image fill alt="" src={data?.thumbnail} />
      </div>
    </div>
  );
};

export default BlogCard;
