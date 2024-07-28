import { comments } from "@/data";
import Image from "next/image";
import React from "react";

const CommentCard = ({ data }: { data: any }) => {
  return (
    <div className="flex items-start gap-2">
      <div className="relative w-10 h-10 overflow-hidden rounded-full">
        <Image fill alt="" src={data?.author?.avatar} />
      </div>
      <div className="p-2 flex-1 bg-stone-100 rounded-md text-sm">
        <div className="text-xs text-gray-500 mb-1">
          <span>
            {Intl.DateTimeFormat(`vn-VN`, {
              month: "short",
              day: "2-digit",
              year: "numeric",
            }).format(new Date(data?.create_at))}
          </span>
        </div>
        <div>{data?.content}</div>
      </div>
    </div>
  );
};
const Comment = () => {
  return (
    <div>
      <div className="text-xl font-medium">Comment</div>
      <div className="mt-4 flex flex-col gap-4">
        {comments.map((comment, index) => (
          <CommentCard key={index} data={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comment;
