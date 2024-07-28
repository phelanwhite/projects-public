"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  MdCalendarMonth,
  MdComment,
  MdFavorite,
  MdOutlineBookmarkAdd,
} from "react-icons/md";
import { PiHandsClappingFill } from "react-icons/pi";
import { RiUserHeartFill } from "react-icons/ri";

const PostOption = () => {
  return (
    <div className="bg-white z-10 border shadow rounded absolute -bottom-60 right-0 w-[250px] font-semibold">
      <ul>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <MdOutlineBookmarkAdd size={20} />
            <span>Save</span>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <MdFavorite size={20} />
            <span>Favorite</span>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <RiUserHeartFill size={20} />
            <span>Follow author</span>
          </button>
        </li>
      </ul>
      <hr className="my-4" />
      <ul>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <span>Hide</span>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <span>Mute author</span>
          </button>
        </li>
        <li>
          <button className="flex items-center gap-2 px-4 py-2 hover:bg-stone-100 w-full">
            <span>Report stort...</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export const PostCard = () => {
  const [isOpenOption, setIsOpenOption] = useState(false);
  return (
    <div>
      {/* author */}
      <Link href={`/author/id`}>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative aspect-video w-5 h-5 overflow-hidden rounded-full">
            <Image
              fill
              loading="lazy"
              alt=""
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9hN28VhVYenw0Og7z1j95n6hQDYw6lMriBA&s`}
            />
          </div>
          <div className="text-xs text-secondary">Oliver Foster</div>
        </div>
      </Link>
      {/* post detail */}
      <div className="flex items-start gap-8">
        <div className="flex-1">
          <div className="font-bold text-xl lg:text-2xl line-clamp-3">
            <Link href={`/post/id`}>
              JAVA: How to Optimize 10,000 If-Else Statements in a Project?
            </Link>
          </div>
          <div className="pt-2 text-base text-secondary font-normal line-clamp-2 ">
            My article is open to everyone; non-member readers can click this
            link to read the full text.
          </div>

          {/* Hidden article footer on laptop screen */}
          <div className="mt-4 hidden lg:flex items-center justify-between text-xs text-secondary">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <MdCalendarMonth />
                <span>
                  {Intl.DateTimeFormat("vn-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).format(new Date())}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <PiHandsClappingFill />
                <span>215</span>
              </div>
              <div className="flex items-center gap-1">
                <MdComment />
                <span>215</span>
              </div>
            </div>
            <div className="relative">
              <button
                onFocus={() => setIsOpenOption(true)}
                onBlur={() => setIsOpenOption(false)}
              >
                <HiOutlineDotsHorizontal size={24} />
              </button>
              {isOpenOption && <PostOption />}
            </div>
          </div>
        </div>
        {/* image */}
        <div className="relative aspect-video max-w-[100px] lg:max-w-[160px] w-full">
          <Image
            fill
            loading="lazy"
            alt=""
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9hN28VhVYenw0Og7z1j95n6hQDYw6lMriBA&s`}
          />
        </div>
      </div>

      {/* Display article footer on laptop screen */}
      <div className="mt-4 lg:hidden flex items-center justify-between text-xs text-secondary">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <MdCalendarMonth />
            <span>
              {Intl.DateTimeFormat("vn-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).format(new Date())}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <PiHandsClappingFill />
            <span>215</span>
          </div>
          <div className="flex items-center gap-1">
            <MdComment />
            <span>215</span>
          </div>
        </div>
        <div className="relative">
          <button
            onFocus={() => setIsOpenOption(true)}
            onBlur={() => setIsOpenOption(false)}
          >
            <HiOutlineDotsHorizontal size={24} />
          </button>
          {isOpenOption && <PostOption />}
        </div>
      </div>
    </div>
  );
};
