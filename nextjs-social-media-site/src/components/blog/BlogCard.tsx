"use client";
import Image from "next/image";
import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";
import { MdComment, MdSave } from "react-icons/md";

const BlogCardOptions = () => {
  return (
    <div className="py-2 rounded bg-white border shadow w-[200px]">
      <div className="flex flex-col">
        <button
          onMouseDown={() => alert(`check`)}
          className="flex items-center gap-2 hover:bg-stone-100 p-2"
        >
          <MdSave />
          <span className="text-xs font-semibold">Save</span>
        </button>
        <button className="flex items-center gap-2 hover:bg-stone-100 p-2">
          <MdSave />
          <span className="text-xs font-semibold">Hiden</span>
        </button>
      </div>
    </div>
  );
};

const BlogCard = () => {
  const [isOptions, setIsOptions] = useState(false);
  return (
    <div className="bg-white shadow rounded p-4">
      <div className="space-y-2">
        {/* top */}
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-2">
            <div className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                loading="lazy"
                alt=""
                fill
                src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
              />
            </div>

            <div className="flex-1">
              <div className="font-semibold">Jack</div>
              <div className="text-gray-500 text-xs">1 day ago</div>
            </div>
          </div>
          <div className="relative">
            <button
              onFocus={() => setIsOptions(true)}
              onBlur={() => setIsOptions(false)}
            >
              <HiOutlineDotsVertical />
            </button>
            {isOptions && (
              <div className="absolute top-0 right-4">
                <BlogCardOptions />
              </div>
            )}
          </div>
        </div>
        {/* content */}
        <div>
          <div className="text-sm">
            Full-Stack Social Media App Tutorial with React 19 & Next.js 15 &
            MySql | React Next.js Full Course Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Qui necessitatibus, a labore velit,
            inventore sit obcaecati molestiae tempore odio placeat porro
            possimus minus ipsa corporis sed, repellendus accusamus doloremque
            ratione!
          </div>
          <div className="mt-2 relative rounded overflow-hidden aspect-video">
            <Image
              loading="lazy"
              alt=""
              fill
              src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/0a4720d9-b258-44c1-8616-7572dd9c56b1/dhg70dn-e4496efa-e845-4ad2-ada1-e0cdcc1dd77b.jpg/v1/fit/w_828,h_566,q_70,strp/a_touch_of_color__by_theghostslastride_dhg70dn-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9ODMyIiwicGF0aCI6IlwvZlwvMGE0NzIwZDktYjI1OC00NGMxLTg2MTYtNzU3MmRkOWM1NmIxXC9kaGc3MGRuLWU0NDk2ZWZhLWU4NDUtNGFkMi1hZGExLWUwY2RjYzFkZDc3Yi5qcGciLCJ3aWR0aCI6Ijw9MTIxNiJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.s0MHHuinpyMPTM7InGCMsCGG4dtbg6TQ6E8cCRKRv_s`}
            />
          </div>
        </div>
        {/* footer content */}
        <div className="text-gray-500 text-xs border-b py-2 space-x-2">
          <span>120 like</span> <span>120 comment</span> <span>120 share</span>
        </div>
        {/* footer button*/}
        <div className="grid grid-cols-3 ">
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <AiFillLike /> <span className="text-xs">Like</span>
          </button>
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <MdComment /> <span className="text-xs">Comment</span>
          </button>
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <IoIosShareAlt /> <span className="text-xs">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
