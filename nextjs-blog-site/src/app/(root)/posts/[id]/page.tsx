"use client";
import ReviewForm from "@/components/form/ReviewForm";
import Loader from "@/components/Loader";
import { getPostById, getReviewsByPostId } from "@/libs/prisma-action";
import { getDateTimeToString } from "@/libs/utils/time";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

const PostIdPage = () => {
  const params = useParams();
  const postIdResult = useQuery({
    queryKey: ["posts", params?.id],
    queryFn: async () => {
      const response = await getPostById(params?.id as string);
      return response;
    },
  });
  const reviewByPostIdResult = useQuery({
    queryKey: ["reviews", params?.id],
    queryFn: async () => {
      const response = await getReviewsByPostId(params?.id as string);
      return response;
    },
  });
  console.log({ postIdResult, reviewByPostIdResult });
  if (postIdResult.isLoading) return <Loader />;
  return (
    <div className="space-y-8">
      <div>
        {postIdResult.data?.categories.map((item) => (
          <Link href={`/posts/category=` + item} key={item}>
            <Button className="capitalize text-xs" type="primary" size="small">
              {item}
            </Button>
          </Link>
        ))}
      </div>
      <div className="font-semibold text-4xl">{postIdResult.data?.title}</div>
      <div className="text-sm text-secondaryColor flex items-center gap-2">
        <Link
          className="flex items-center gap-2"
          href={`/author/${postIdResult.data?.authorId}`}
        >
          <div className="relative rounded-full overflow-hidden w-7 h-7">
            <Image
              fill
              alt=""
              src={postIdResult.data?.author.avatar as string}
            />
          </div>
          <div className="font-medium">
            {postIdResult.data?.author.username}
          </div>
        </Link>
        <div>{getDateTimeToString(postIdResult.data?.updateAt as Date)}</div>
      </div>
      <div className=" relative rounded-md overflow-hidden aspect-video">
        <Image fill alt="" src={postIdResult.data?.thumbnail as string} />
      </div>
      <div
        dangerouslySetInnerHTML={{
          __html: postIdResult.data?.description as string,
        }}
      ></div>
      <div>
        <ReviewForm />
      </div>
    </div>
  );
};

export default PostIdPage;
