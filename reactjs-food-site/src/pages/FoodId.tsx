import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const FoodId = () => {
  const { id } = useParams();
  const foodId = useQuery({
    queryKey: ["food", id],
    queryFn: () =>
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(
        (res) => res.json()
      ),
  });
  const dataResult = foodId?.data?.meals?.[0];
  const ingredient = useMemo(() => {
    return (
      foodId?.data?.meals?.[0] &&
      Object.entries(foodId?.data?.meals?.[0])
        ?.filter((item) => {
          return item?.[0]?.includes(`strIngredient`) && item?.[1];
        })
        ?.map((item) => item?.[1])
    );
  }, [foodId]);

  if (foodId.isPending) return "Loading...";

  return (
    <div className="wrapper my-8 ">
      <div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-md shadow hover:shadow-md border"
          onClick={() => window.history.back()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back
        </button>
      </div>
      <div className="mt-8 flex md:flex-row flex-col gap-8">
        <div className="aspect-video overflow-hidden rounded-md w-full md:max-w-[300px] lg:max-w-[500px]">
          <img src={dataResult?.strMealThumb} loading="lazy" alt="" />
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-xl font-semibold">{dataResult?.strMeal}</div>
          <div>
            <span className="font-semibold text-base">Ingredient: </span>
            {ingredient?.join(", ")}
          </div>
          <div>
            <span className="font-semibold text-base">Area: </span>
            {dataResult?.strArea}
          </div>
          <div>
            <span className="font-semibold text-base">Category: </span>
            <Link to={`/?c=${dataResult?.strCategory}`}>
              {dataResult?.strCategory}
            </Link>
          </div>
          <div>
            <span className="font-semibold text-base">Instructions: </span>
            <span>{dataResult?.strInstructions}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodId;
