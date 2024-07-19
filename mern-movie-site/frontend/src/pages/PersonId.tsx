import { useCallback } from "react";
import { person_idApi, person_idMediaApi } from "../services/tmdb";
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/loader";
import SlideCard from "../components/SlideCard";
import { person_mediaTypeList } from "../constants";
import PerosnIdBanner from "../components/PerosnIdBanner";

const PersonId = () => {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams({
    media_type: `movie`,
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

  const person_id = useQuery({
    queryKey: [`person_id`, id],
    queryFn: async () => {
      const response = await person_idApi(id as string);
      return response;
    },
  });

  const person_media = useQuery({
    queryKey: [`person_media`, searchParams.toString(), id],
    queryFn: async () => {
      const response = await person_idMediaApi(
        id as string,
        searchParams.get("media_type") === "movie"
          ? "movie_credits"
          : "tv_credits"
      );
      return response;
    },
  });

  if (person_id.isLoading || person_media.isLoading) return <Loader />;

  return (
    <div>
      <PerosnIdBanner data={person_id.data} />
      <div className="wrapper my-10 space-y-8">
        <div className="flex items-center justify-end">
          <select
            className="text-sm cursor-pointer border px-3 py-1 outline-none rounded-lg"
            value={searchParams.get("media_type") as string}
            onChange={(e) => handleSearchParams(`media_type`, e.target.value)}
            name=""
            id=""
          >
            {person_mediaTypeList.map((item) => (
              <option key={item.title} value={item.value}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <SlideCard
          title="Cast"
          data={person_media.data?.cast}
          media_type={searchParams.get("media_type") as string}
        />
        <SlideCard
          title="Crew"
          data={person_media.data?.crew}
          media_type={searchParams.get("media_type") as string}
        />
      </div>
    </div>
  );
};

export default PersonId;
