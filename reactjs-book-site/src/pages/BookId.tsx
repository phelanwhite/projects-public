import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";
import { useParams } from "react-router-dom";
import { getBookImage } from "../utils/libraryApi";
import { IoMdArrowRoundBack } from "react-icons/io";
const BookId = () => {
  const { id } = useParams();
  const { data: getBookResult, ...getBook } = useQuery({
    queryKey: ["book", id],
    queryFn: () => {
      const url = `https://openlibrary.org/works/${id}.json`;
      return fetch(url).then((res) => res.json());
    },
  });

  console.log({ getBookResult });
  if (getBook.isLoading) return <Loader />;

  return (
    <div className="wrapper py-8">
      <div>
        <button
          onClick={() => window.history.back()}
          className="shadow px-4 py-2 rounded-md flex items-center gap-2"
        >
          <IoMdArrowRoundBack />
          Back
        </button>
      </div>
      <div className="my-8 flex flex-col md:flex-row md:items-start gap-8">
        <div className="aspect-thumbnail lg:max-w-[400px] md:max-w-[300px] w-full rounded-md overflow-hidden">
          <img
            src={getBookImage(getBookResult?.covers?.[0])}
            loading="lazy"
            alt=""
          />
        </div>
        <div className="flex-1 space-y-4">
          <div className="text-xl font-semibold">{getBookResult?.title}</div>
          <div>
            <span className="capitalize font-semibold">
              first publish date:{" "}
            </span>
            <span>{getBookResult?.first_publish_date}</span>
          </div>
          <div>
            <span className="capitalize font-semibold">description: </span>
            <span
              dangerouslySetInnerHTML={{ __html: getBookResult?.description }}
            ></span>
          </div>

          <div>
            <span className="capitalize font-semibold">subjects: </span>
            <span>{getBookResult?.subjects?.join(", ")}</span>
          </div>
          <div>
            <span className="capitalize font-semibold">subject places: </span>
            <span>{getBookResult?.subject_places?.join(", ")}</span>
          </div>
          <div>
            <span className="capitalize font-semibold">subject people: </span>
            <span>{getBookResult?.subject_people?.join(", ")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookId;
