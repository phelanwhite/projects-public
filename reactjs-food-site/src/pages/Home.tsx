import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import FoodCard from "../components/FoodCard";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "../hooks/useDebounce";

const Home = () => {
  const [q, setQ] = useState("");
  const searchValue = useDebounce(q, 500);
  const [searchParams, setSearchParams] = useSearchParams({
    s: searchValue,
    c: "",
    limit: `100`,
  });
  const handleSearchParams = (name: string, value: string) => {
    setSearchParams(
      (prev) => {
        prev.set(name, value);
        return prev;
      },
      { replace: true }
    );
  };

  useEffect(() => {
    handleSearchParams(`s`, searchValue);
  }, [searchValue]);

  const { data: foodResult, ...food } = useQuery({
    queryKey: ["food", searchParams.toString()],
    queryFn: () => {
      const url = searchParams.get(`c`)
        ? `https://www.themealdb.com/api/json/v1/1/filter.php?${searchParams.toString()}`
        : `https://www.themealdb.com/api/json/v1/1/search.php?${searchParams.toString()}`;
      return fetch(`${url}${searchParams.toString()}`).then((res) =>
        res.json()
      );
    },
  });

  const { data: categoryResult, ...category } = useQuery({
    queryKey: ["category"],
    queryFn: () =>
      fetch("https://www.themealdb.com/api/json/v1/1/categories.php").then(
        (res) => res.json()
      ),
  });

  if (food.isPending || category.isLoading) return "Loading...";

  return (
    <div>
      <div
        className="py-12 px-4"
        style={{
          background: `linear-gradient(rgba(50, 50, 100, 0.3), rgba(50, 50, 100, 0.5)), url(https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA1L3B4MTM2OTgxMy1pbWFnZS1rd3Z4eHA5MS5qcGc.jpg) no-repeat center/cover`,
        }}
      >
        <div className="mx-auto max-w-[600px] text-center space-y-4 text-white">
          <div className="text-xl font-semibold">
            Find Meals For Your Ingredients
          </div>
          <div>
            Real food doesn't have ingredients, real food is ingredients.
          </div>
          <div className="border rounded-full px-4">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search..."
              type="text"
              className="border-none outline-none py-2 w-full bg-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleSearchParams(`c`, "")}
              className="text-xs px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold"
            >
              All
            </button>
            {categoryResult?.categories?.map((item: any) => (
              <button
                onClick={() => handleSearchParams(`c`, item?.strCategory)}
                key={item?.idCategory}
                className="text-xs px-3 py-1 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-500 font-semibold"
              >
                {item?.strCategory}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="wrapper my-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {foodResult?.meals?.map((item: any) => (
          <FoodCard key={item?.idMeal} data={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
