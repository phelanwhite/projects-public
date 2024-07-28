"use client";
import BlogCard, { BlogCardColumn } from "@/components/BlogCard";
import Comment from "@/components/Comment";
import { blogId, blogs } from "@/data";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdDateRange, MdOutlineBookmarkAdd } from "react-icons/md";

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

const BlogId = () => {
  const data = blogId;
  const [isOptions, setIsOptions] = useState(false);
  return (
    <div className="max-w-[1000px] w-full mx-auto space-y-4">
      <div className="text-3xl font-semibold">{data.title}</div>
      <div className="text-gray-500 font-medium">{data?.content}</div>
      <div className="flex items-start gap-2">
        <div className="relative w-10 h-10 overflow-hidden rounded-full">
          <Image fill alt="" src={data?.author?.avatar} />
        </div>
        <div>
          <div className="font-semibold flex items-center gap-4">
            <span>{data?.author?.name}</span>{" "}
            <button className="px-3 py-1 rounded-full border text-xs hover:bg-stone-100">
              Follow
            </button>
          </div>
          <div className="text-gray-500 text-xs">
            <span>6 min read</span>
          </div>
        </div>
      </div>
      <div className="border-y py-2">
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
      <div dangerouslySetInnerHTML={{ __html: data.description }}></div>

      <div className="border-t py-4 space-y-4">
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="font-semibold ">Categories: </span>
          {data?.categories?.map((category, index) => (
            <Link href={category.link} key={index} className="">
              {category.title}
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <span className="font-semibold ">Tags: </span>
          {data?.tags?.map((tag, index) => (
            <Link href={tag.link} key={index} className="">
              {tag.title}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t py-4 space-y-4">
        <Comment />
      </div>
      <div className="border-t py-4 space-y-8">
        <div>
          <div className="text-xl font-medium">More from Kasuto</div>
          <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <BlogCardColumn key={index} data={blog} isColumn />
            ))}
          </div>
        </div>
        <div>
          <div className="text-xl font-medium">Recommended</div>
          <div className="mt-4 grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {blogs.map((blog, index) => (
              <BlogCardColumn key={index} data={blog} isColumn />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogId;
