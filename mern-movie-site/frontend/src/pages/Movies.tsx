import { useQuery } from "@tanstack/react-query";
import { moviesApi } from "../services/tmdb";
import MediaCard from "../components/MediaCard";
import Paginate from "../components/paginate";
import { useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import Loader from "../components/loader";
import { movie_typeList } from "../constants";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: `1`,
    movies_type: movie_typeList[0].value,
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
  const movies = useQuery({
    queryKey: ["movies", searchParams.toString()],
    queryFn: async () =>
      await moviesApi({
        paramster: searchParams.toString(),
        type: searchParams.get("movies_type") as string,
      }),
  });

  if (movies.isLoading) return <Loader />;

  return (
    <div className="wrapper my-10 space-y-8 ">
      <div className="flex items-center justify-end">
        <select
          className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
          value={searchParams.get("movies_type") as string}
          onChange={(e) => {
            handleSearchParams(`movies_type`, e.target.value);
            handleSearchParams(`page`, `1`);
          }}
        >
          {movie_typeList.map((item) => (
            <option key={item.title} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
        {movies.data?.results?.map((movie: any) => (
          <MediaCard key={movie?.id} data={movie} media_type="movie" />
        ))}
      </div>
      <Paginate
        forcePage={Number(movies.data?.page) - 1}
        pageCount={
          movies?.data?.total_pages > 500 ? 500 : movies?.data?.total_pages
        }
        onPageChange={(e) => handleSearchParams(`page`, String(e.selected + 1))}
      />
    </div>
  );
};

export default Movies;
