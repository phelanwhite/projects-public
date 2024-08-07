import ListCard from "@/components/common/ListCard";
import Loader from "@/components/common/Loader";
import { useListStore } from "@/store/list-store";
import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";

const YourListPage = () => {
  const { getListsByMe, lists } = useListStore();
  const getListsByMeResult = useQuery({
    queryKey: ["getListsByMe", lists],
    queryFn: async () => {
      const result = await getListsByMe();
      return result;
    },
  });
  if (getListsByMeResult.isLoading) return <Loader />;
  return (
    <div>
      {lists?.length === 0 && <div>No lists found.</div>}
      {lists?.length > 0 && (
        <>
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2">
            {lists?.map((item: any) => (
              <ListCard key={item?._id} data={item} />
            ))}
          </div>
          <div className="w-max mx-auto mt-4 ">
            <Pagination
              onChange={(e) => {
                window.location.replace(
                  window.location.pathname + `?page=${e}`
                );
              }}
              current={getListsByMeResult.data?.result?.page}
              pageSize={getListsByMeResult.data?.result?.limit}
              total={getListsByMeResult.data?.result?.total_rows}
              showSizeChanger={false}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default YourListPage;
