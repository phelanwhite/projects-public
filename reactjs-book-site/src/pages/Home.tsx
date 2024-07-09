import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";
import { useEffect, useState } from "react";
import { useDebounce } from "../hooks/useDebounce";
import BookCard from "../components/BookCard";
import Paginate from "../components/paginate";
import banner from "../assets/library-img.jpg";
import { useSearchParams } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

const Home = () => {
  const [q, setQ] = useState("the+lord+of+the+rings");
  const searchValue = useDebounce(q, 500);

  const [searchParams, setSearchParams] = useSearchParams({
    page: `1`,
    q: searchValue,
    limit: `100`,
  });

  useEffect(() => {
    if (searchValue) {
      handleSearchPrams("q", searchValue);
      handleSearchPrams("page", `1`);
    }
  }, [searchValue]);

  const handleSearchPrams = (name: string, value: string) => {
    setSearchParams(
      (params) => {
        params.set(name, value);
        return params;
      },
      { replace: true }
    );
  };

  const getBooks = useQuery({
    queryKey: ["books", searchParams.toString()],
    queryFn: async () => {
      const url = `https://openlibrary.org/search.json?${searchParams.toString()}`;
      return await fetch(url).then((res) => res.json());
    },
  });

  if (getBooks.isLoading) return <Loader />;

  return (
    <div>
      <div
        className="py-8 text-white min-h-[30vh] md:min-h-[50vh] flex justify-center items-center"
        style={{
          background: `linear-gradient(rgba(141, 39, 174, 0.3), rgba(141, 39, 174, 0.5)), url(${banner}) no-repeat center/cover`,
        }}
      >
        <div className="wrapper">
          <div className="text-center  max-w-[500px] mx-auto flex flex-col gap-6">
            <div className="capitalize text-xl font-semibold">
              find your book of choice.
            </div>
            <div className="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam
              beatae sapiente quibusdam consequatur perspiciatis facere
              laboriosam non nesciunt at id repudiandae, modi iste? Eligendi,
              rerum!
            </div>

            <div className="border rounded-full flex items-center pr-4">
              <input
                className="bg-transparent border-none outline-none py-2 px-4 w-full"
                type="text"
                placeholder="Search for books"
                value={q}
                onChange={(e) => {
                  setQ(e.target.value);
                }}
              />
              <IoMdSearch />
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper my-8">
        {getBooks?.data?.docs?.length > 0 ? (
          <div>
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
              {getBooks?.data?.docs?.map((item: any) => (
                <BookCard key={item?.key} data={item} />
              ))}
            </div>

            <Paginate
              forcePage={Number(searchParams.get(`page`)) - 1}
              pageCount={Math.ceil(
                Number(getBooks?.data?.numFound) /
                  Number(searchParams.get(`limit`))
              )}
              onPageChange={(e) => {
                handleSearchPrams(`page`, String(e.selected + 1));
              }}
            />
          </div>
        ) : (
          <div>No Result Found!</div>
        )}
      </div>
    </div>
  );
};

export default Home;
