import { memo } from "react";
import { Link } from "react-router-dom";
import { getTmdbImage } from "../services/tmdb";

const PersonCard = ({ data }: { data: any }) => {
  return (
    <Link to={`/person/${data?.id}`} className="">
      <div className="rounded-lg overflow-hidden aspect-thumbnail">
        <img src={getTmdbImage(data?.profile_path)} alt="" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="font-semibold line-clamp-1">{data?.name}</div>
        <div className="text-xs">{data?.original_name}</div>
        <div className="text-xs">{data?.known_for_department}</div>
      </div>
    </Link>
  );
};

export default memo(PersonCard);
