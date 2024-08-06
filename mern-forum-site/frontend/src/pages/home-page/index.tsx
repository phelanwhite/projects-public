import PostCard from "@/components/common/PostCard";
import axiosClient from "@/configs/axiosClient";
import { useQuery } from "@tanstack/react-query";

const HomePage = () => {
  const postsResult = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const url = `post/get-all`;
      const response = await axiosClient.get(url);

      return response.data;
    },
  });

  return (
    <div className="max-w-[700px]">
      {postsResult.data?.result?.data?.map((item: any) => (
        <div key={item?._id} className="pb-4 mb-4 border-b">
          <PostCard data={item} />
        </div>
      ))}
    </div>
  );
};

export default HomePage;
