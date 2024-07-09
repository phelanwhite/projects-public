import { Link } from "react-router-dom";

const FoodCard = ({ data }: { data: any }) => {
  return (
    <div className="rounded-lg border overflow-hidden shadow">
      <Link to={data?.idMeal}>
        <div className="aspect-video  ">
          <img src={data?.strMealThumb} alt="" loading="lazy" />
        </div>
      </Link>
      <div className="space-y-4 p-3 pb-5">
        <Link
          to={data?.idMeal}
          className="text-base font-semibold line-clamp-2"
        >
          {data?.strMeal}
        </Link>
        <div className="line-clamp-4">{data?.strInstructions}</div>
      </div>
    </div>
  );
};

export default FoodCard;
