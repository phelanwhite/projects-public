import { useQuery } from "@tanstack/react-query";
import { tvSeriesApi } from "../services/tmdb";
import MediaCard from "../components/MediaCard";
import Paginate from "../components/paginate";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import Loader from "../components/loader";
import { tvSeries_typeList } from "../constants";

const TVSeries = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: `1`,
    tvSeries_type: tvSeries_typeList[0].value,
  });
  const handleSearchParams = useCallback(
    (name: string, value: string) => {
      setSearchParams(
        (prev) => {
          prev.set(name, value);
          return prev;
        },
        { replace: true }
      );
    },
    [setSearchParams]
  );
  const tvSeries = useQuery({
    queryKey: ["tvSeries", searchParams.toString()],
    queryFn: async () =>
      await tvSeriesApi({
        paramster: searchParams.toString(),
        type: searchParams.get("tvSeries_type") as string,
      }),
  });

  if (tvSeries.isLoading) return <Loader />;

  return (
    <div className="wrapper my-10 space-y-8 ">
      <div className="flex items-center justify-end">
        <select
          className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
          value={searchParams.get("tvSeries_type") as string}
          onChange={(e) => {
            handleSearchParams(`tvSeries_type`, e.target.value);
            handleSearchParams(`page`, `1`);
          }}
        >
          {tvSeries_typeList.map((item) => (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {tvSeries.data?.results?.map((movie: any) => (
          <MediaCard key={movie?.id} data={movie} media_type="tv" />
        ))}
      </div>
      <Paginate
        forcePage={Number(tvSeries.data?.page) - 1}
        pageCount={
          tvSeries?.data?.total_pages > 500 ? 500 : tvSeries?.data?.total_pages
        }
        onPageChange={(e) => handleSearchParams(`page`, String(e.selected + 1))}
      />
    </div>
  );
};

export default TVSeries;
