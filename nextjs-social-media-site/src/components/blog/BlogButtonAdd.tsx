"use client";
import Image from "next/image";
import React from "react";
import { IoMdHappy, IoMdPhotos } from "react-icons/io";
import { IoVideocam } from "react-icons/io5";
import Modal from "../Modal";
import BlogForm from "./BlogForm";

const BlogButtonAdd = () => {
  const [modalOpen, setModalOpen] = React.useState(false);
  return (
    <>
      <div className="bg-white shadow rounded p-4">
        <div className="flex items-stretch gap-2">
          <div className="relative h-10 w-10 overflow-hidden rounded-full">
            <Image
              loading="lazy"
              alt=""
              fill
              src={`https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/1c11a64e-b138-445b-b89f-b69755e09685/dg5hwoc-cbd45ce4-ac59-4f5d-ae37-33b447eac0cf.png/v1/fit/w_828,h_474,q_70,strp/samurai_wallpaper_by_definesleep_dg5hwoc-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvMWMxMWE2NGUtYjEzOC00NDViLWI4OWYtYjY5NzU1ZTA5Njg1XC9kZzVod29jLWNiZDQ1Y2U0LWFjNTktNGY1ZC1hZTM3LTMzYjQ0N2VhYzBjZi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.QYxwo5p9cersF8X86RAp7Y3tO2j11Y9PmkuN180eDQk`}
            />
          </div>
          <div
            onClick={() => setModalOpen(true)}
            className="cursor-pointer flex-1 rounded-full bg-stone-100 text-gray-500 flex items-center px-4"
          >
            What is your mind?
          </div>
        </div>
        {/* option */}
        <div className="mt-2 grid grid-cols-3 ">
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <IoVideocam /> <span className="text-xs">Live</span>
          </button>
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <IoMdPhotos /> <span className="text-xs">Photo</span>
          </button>
          <button className="flex items-center justify-center gap-2 font-semibold text-gray-500 hover:bg-gray-100 p-2 rounded">
            <IoMdHappy /> <span className="text-xs">Feeling</span>
          </button>
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <BlogForm />
      </Modal>
    </>
  );
};

export default BlogButtonAdd;
