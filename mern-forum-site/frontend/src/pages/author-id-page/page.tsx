import Loader from "@/components/common/Loader";
import PostCard from "@/components/common/PostCard";
import ReviewList from "@/components/common/ReviewList";
import axiosClient from "@/configs/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Button, Pagination } from "antd";
import { useParams } from "react-router-dom";

const AuthorIdPage = () => {
  const { id } = useParams();
  const authorResult = useQuery({
    queryKey: ["author", id],
    queryFn: async () => {
      const url = `author/get-id/${id}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

  const postsResult = useQuery({
    queryKey: ["posts", id, window.location.search],
    queryFn: async () => {
      const url = `post/get-post-by-author-id/${id + window.location.search}`;
      const response = await axiosClient.get(url);
      return response.data;
    },
  });

  if (authorResult.isLoading || postsResult.isLoading) return <Loader />;
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-3 max-w-[1000px] w-full mx-auto p-4 rounded-md bg-stone-100">
        <div className="w-12 h-12 overflow-hidden rounded-full">
          <img loading="lazy" src={authorResult.data?.result?.avatar} alt="" />
        </div>
        <div>
          <div className="text-base font-semibold text-center">
            {authorResult.data?.result?.username}
          </div>
          <div className="text-xs text-secondary text-center">
            {authorResult.data?.result?.job}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 text-sm font-semibold">
          <div>{authorResult.data?.result?.followers?.length} follower</div>
          <div>{authorResult.data?.result?.following?.length} following</div>
          <div>{postsResult.data?.result?.total_rows} post</div>
        </div>
        <div className="italic text-center">
          {authorResult.data?.result?.bio}
        </div>

        <Button type="primary">Follow</Button>
      </div>
      {postsResult.data?.result?.data?.length === 0 && (
        <div>
          No posts found. Please check back later. You can also create a new
          post by clicking the button below.
          <Button type="primary" href={`/create-post?author_id=${id}`}>
            Create a new post
          </Button>
        </div>
      )}
      {postsResult.data?.result?.data?.length > 0 && (
        <>
          <div className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {postsResult.data?.result?.data?.map((post: any) => (
              <PostCard key={post?._id} isColumn={true} data={post} />
            ))}
          </div>

          <div className="w-max mx-auto">
            <Pagination
              onChange={(e) => {
                window.location.replace(
                  window.location.pathname + `?page=${e}`
                );
              }}
              current={postsResult.data?.result?.page}
              pageSize={postsResult.data?.result?.limit}
              total={postsResult.data?.result?.total_rows}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
      <ReviewList />
    </div>
  );
};

export default AuthorIdPage;
