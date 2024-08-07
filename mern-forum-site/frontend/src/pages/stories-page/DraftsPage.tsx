import Loader from "@/components/common/Loader";
import PostCard from "@/components/common/PostCard";
import { usePostStore } from "@/store/post-store";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";

const DraftsPage = () => {
  const { getPostsDrafts, posts } = usePostStore();
  const getListsByMeDraftsResult = useQuery({
    queryKey: ["Drafts", posts, window.location.search],
    queryFn: async () => {
      const result = await getPostsDrafts(window.location.search);
      return result;
    },
  });

  if (getListsByMeDraftsResult.isLoading) return <Loader />;
  return (
    <div>
      {posts?.length === 0 && <div>No posts found.</div>}
      {posts.length > 0 && (
        <>
          <div className="grid gap-x-8 gap-y-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts?.map((post: any) => (
              <PostCard
                key={post?._id}
                isColumn={true}
                data={post}
                isAuth={true}
              />
            ))}
          </div>

          <div className="w-max mx-auto mt-4">
            <Pagination
              onChange={(e) => {
                window.location.replace(
                  window.location.pathname + `?page=${e}`
                );
              }}
              current={getListsByMeDraftsResult.data?.result?.page}
              pageSize={getListsByMeDraftsResult.data?.result?.limit}
              total={getListsByMeDraftsResult.data?.result?.total_rows}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default DraftsPage;
