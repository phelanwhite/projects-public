import Image from "next/image";
import Link from "next/link";
import React from "react";

const PostCard = ({ data }: { data: PostType }) => {
  return (
    <div className="border-[#E8E8EA] border overflow-hidden rounded-md group p-4">
      <div className="relative aspect-video overflow-hidden rounded-md">
        <Image
          fill
          alt=""
          src={data.thumbnail}
          loading="lazy"
          className="transition group-hover:scale-110"
        />
      </div>
      <div className="py-4">
        <div>
          <Link
            href={`category/${data.categories?.[0]}`}
            className="py-1 px-2.5 capitalize rounded bg-blue-100 text-blue-600 text-sm font-medium w-max bg-bgPrimary text-primaryColor"
          >
            {data.categories?.[0]}
          </Link>
        </div>
        <div className="pb-5 pt-4">
          <Link
            href={`post-id/${data.id}`}
            className="font-semibold text-2xl line-clamp-3"
          >
            {/* {data.title} */}
            The Impact of Technology on the Workplace: How Technology is
            Changing
          </Link>
        </div>

        <div className="flex items-center gap-5 text-secondaryColor">
          <Link
            href={`author/${data.author.id}`}
            className="flex items-center gap-3 w-max  font-medium line-clamp-1 flex-1"
          >
            <div className="relative w-9 h-9 overflow-hidden rounded-full ">
              <Image fill alt="" src={data.author.avatar} loading="lazy" />
            </div>
            <div>{data.author.username}</div>
          </Link>
          <div className="text-base ">August 20, 2022</div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
