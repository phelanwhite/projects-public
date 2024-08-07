import Loader from "@/components/common/Loader";
import PostCard, { PostCardOptions } from "@/components/common/PostCard";
import ReviewList from "@/components/common/ReviewList";
import ReviewForm from "@/components/form/ReviewForm";
import axiosClient from "@/configs/axiosClient";
import { changeTimeToString } from "@/utils/time";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { MdOutlineModeComment } from "react-icons/md";
import { PiHandsClappingDuotone } from "react-icons/pi";
import { Link, useParams } from "react-router-dom";

const PostIdPage = () => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const { id } = useParams();
  const postResult = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const result = await axiosClient.get(`post/get-id/${id}`);

      return result.data;
    },
  });
  const postRecommendedResult = useQuery({
    queryKey: ["postRecommended", id],
    queryFn: async () => {
      const result = await axiosClient.get(`post/get-all`);

      return result.data;
    },
  });
  console.log({ postRecommendedResult, postResult });

  if (postResult.isLoading) return <Loader />;
  return (
    <div className="max-w-[732px] w-full mx-auto space-y-6">
      <div className="text-3xl font-bold">{}</div>
      {/* author */}
      <div className="flex items-start gap-4">
        <Link to={`/author/id`}>
          <div className="w-10 h-10 overflow-hidden rounded-full">
            <img
              loading="lazy"
              src={postResult.data?.result?.author?.avatar}
              alt=""
            />
          </div>
        </Link>
        <div>
          <Link to={`/author/id`}>
            <div className="font-medium">
              {postResult.data?.result?.author?.username}
            </div>
          </Link>
          <div className="text-xs text-secondary font-medium flex items-center gap-2">
            <span>3 min read</span>
            <span>-</span>
            <span>
              {changeTimeToString(new Date(postResult.data?.result?.updatedAt))}
            </span>
          </div>
        </div>
      </div>
      <div className="border-y py-1">
        <div className="flex items-center justify-between text-secondary">
          <div className="flex items-center gap-4 text-xs ">
            <div className="flex items-center gap-1">
              <PiHandsClappingDuotone />
              <span>{postResult.data?.result?.count_vote}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdOutlineModeComment />
              <span>{postResult.data?.result?.count_comment}</span>
            </div>
          </div>
          <div className="relative">
            <button
              onFocus={() => setIsOpenOptions(true)}
              onBlur={() => setIsOpenOptions(false)}
            >
              <HiOutlineDotsHorizontal size={24} />
            </button>
            {isOpenOptions && <PostCardOptions />}
          </div>
        </div>
      </div>
      <div
        className=""
        dangerouslySetInnerHTML={{
          __html: postResult.data?.result?.subTitle,
        }}
      ></div>
      {/* thumbnail */}
      {postResult.data?.result?.thumbnail && (
        <div className="aspect-video ">
          <img loading="lazy" src={postResult.data?.result?.thumbnail} alt="" />
        </div>
      )}
      <div
        className=""
        dangerouslySetInnerHTML={{
          __html: postResult.data?.result?.description,
        }}
      ></div>

      {/* Review */}
      <div className="space-y-6">
        <div className="text-xl font-semibold">Review</div>
        <ReviewForm />
        <ReviewList />
      </div>

      {/* Recommended */}
      <div className="space-y-6">
        <div className="text-xl font-semibold">Recommended</div>
        <div className="grid gap-x-8 gap-y-12 grid-cols-1 sm:grid-cols-2">
          {postRecommendedResult.data?.result?.data?.map((post: any) => (
            <PostCard key={post._id} isColumn={true} data={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostIdPage;
