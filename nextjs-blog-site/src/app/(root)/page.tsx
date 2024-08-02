"use client";
import PostCard from "@/components/common/PostCard";
import Loader from "@/components/Loader";
import { getPosts } from "@/libs/prisma-action";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Image from "next/image";
import banner from "@/data/images/Image.png";
import React from "react";
import Link from "next/link";

const HomePage = () => {
  const getPostsResult = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await getPosts();
      return response;
    },
  });

  if (getPostsResult.isPending) return <Loader />;

  return (
    <div>
      <div className="">
        <div className="relative hidden md:block">
          <div className="relative rounded-md aspect-video overflow-hidden">
            <Image alt="" loading="lazy" src={banner} fill />
          </div>
          <div className="absolute left-10 -bottom-10 bg-bgColor p-10 rounded-md w-[600px] shadow-lg">
            <div>
              <Link
                href={`category/`}
                className="py-1 px-2.5 capitalize rounded bg-blue-100 text-blue-600 text-sm font-medium w-max bg-bgPrimary text-primaryColor"
              >
                Technology
              </Link>
            </div>
            <div className="mt-4 mb-6 text-4xl font-semibold">
              The Impact of Technology on the Workplace: How Technology is
              Changing
            </div>
            <div className=" flex items-center gap-5 text-secondaryColor">
              <Link
                href={`author/`}
                className="flex items-center gap-3 w-max  font-medium line-clamp-1 flex-1"
              >
                <div className="relative w-9 h-9 overflow-hidden rounded-full ">
                  <Image fill alt="" src={banner} loading="lazy" />
                </div>
                <div>Jason Francisco</div>
              </Link>
              <div className="text-base ">August 20, 2022</div>
            </div>
          </div>
        </div>

        <div className="bg-bgGray text-secondaryColor text-center p-4 mt-20 mb-24">
          <div className="text-sm">Advertisement</div>
          <div className="text-xl font-semibold">You can place ads</div>
          <div className="text-[18px]">750x100</div>
        </div>
        <div className="font-bold text-2xl">Latest Post</div>
        <div className="py-8 grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {getPostsResult.data?.map((post: any) => (
            <PostCard key={post.id} data={post} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button href={`/posts`}>View all post</Button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
