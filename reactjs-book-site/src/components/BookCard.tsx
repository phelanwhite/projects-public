import { Link } from "react-router-dom";
import { getBookImage } from "../utils/libraryApi";

const BookCard = ({ data }: { data: any }) => {
  return (
    <div className="border rounded-md overflow-hidden shadow hover:shadow-md relative">
      <Link className="" to={`/${data?.key?.replace("/works/", "")}`}>
        <div className="aspect-thumbnail">
          <img src={getBookImage(data?.cover_i)} alt="" loading="lazy" />
        </div>
      </Link>

      <div className="p-3 space-y-2 text-center font-semibold">
        <Link className="line-clamp-2 text-base h-12" to={`/${data?.key}`}>
          {data?.title}
        </Link>
        <div className="line-clamp-1">
          <span>Author: </span>
          <span className="text-stone-500">
            {data?.author_name?.join(", ")}
          </span>
        </div>
        <div className="line-clamp-1">
          <span>Edition count: </span>
          <span className="text-stone-500">{data?.edition_count}</span>
        </div>
        <div className="line-clamp-1 italic">
          <span>First publish year: </span>
          <span className="text-stone-500">{data?.first_publish_year}</span>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
