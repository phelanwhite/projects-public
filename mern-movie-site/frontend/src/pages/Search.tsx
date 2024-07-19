import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import banner from "../assets/banner-about.png";
import { searchApi } from "../services/tmdb";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";
import MediaCard from "../components/MediaCard";
import PersonCard from "../components/PersonCard";
import { useSearchParams } from "react-router-dom";
import Paginate from "../components/paginate";
import { search_typeList } from "../constants";
import CollectionCard from "../components/CollectionCard";
import CompanyCard from "../components/CompanyCard";

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    query: ``,
    search_type: search_typeList[0].value,
    page: `1`,
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

  const [value, setValue] = useState(searchParams.get("query") || "");

  useEffect(() => {
    if (value) {
      const timer = setTimeout(() => {
        handleSearchParams(`query`, value);
        handleSearchParams(`page`, `1`);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [value]);

  const search = useQuery({
    queryKey: [`search`, searchParams.toString()],
    queryFn: async () => {
      const response = await searchApi({
        paramster: searchParams.toString(),
        type: searchParams.get("search_type") as string,
      });
      return response;
    },
  });

  if (search.isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      <div
        className="py-16 min-h-[40%]"
        style={{
          background: `url(${banner}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper">
          <div className="text-2xl md:text-4xl font-semibold text-white">
            Welcome.
          </div>
          <div className="text-xl md:text-2xl font-semibold text-white mt-2 mb-8">
            Millions of movies, TV shows and people to discover. Explore now.
          </div>
          <div className="flex items-center gap-4 px-4 rounded-full bg-white">
            <FaSearch />
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Search for a movie, tv show, person, ......"
              type="text"
              className="border-none outline-none w-full bg-transparent py-2"
            />
          </div>
        </div>
      </div>
      <div className="wrapper my-10 space-y-8">
        <div className="flex items-center justify-end">
          <select
            className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
            value={searchParams.get("search_type") as string}
            onChange={(e) => {
              handleSearchParams(`search_type`, e.target.value);
              handleSearchParams(`page`, `1`);
            }}
          >
            {search_typeList.map((item) => (
              <option key={item.title} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>

        {search.data?.results?.length > 0 ? (
          <>
            <div className="grid gap-x-2 gap-y-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
              {search.data?.results?.map((item: any) => {
                if (
                  item?.media_type === "person" ||
                  searchParams.get("search_type") === "person"
                )
                  return <PersonCard data={item} key={item.id} />;
                else if (
                  item?.media_type === "movie" ||
                  searchParams.get("search_type") === "movie" ||
                  item?.media_type === "tv" ||
                  searchParams.get("search_type") === "tv"
                )
                  return (
                    <MediaCard
                      key={item?.id}
                      data={item}
                      media_type={searchParams.get("search_type") as string}
                    />
                  );
                else if (
                  item?.media_type === "collection" ||
                  searchParams.get("search_type") === "collection"
                )
                  return <CollectionCard key={item?.id} data={item} />;
                else if (
                  item?.media_type === "company" ||
                  searchParams.get("search_type") === "company"
                )
                  return <CompanyCard key={item?.id} data={item} />;
              })}
            </div>
            <Paginate
              forcePage={Number(search.data?.page) - 1}
              pageCount={search?.data?.total_pages}
              onPageChange={(e) =>
                handleSearchParams(`page`, String(e.selected + 1))
              }
            />
          </>
        ) : (
          <div>
            <div className="text-center text-xl font-semibold text-gray-500">
              No results found.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
