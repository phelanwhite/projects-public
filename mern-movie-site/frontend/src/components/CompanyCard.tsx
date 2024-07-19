import { memo } from "react";
import { Link } from "react-router-dom";
import { getTmdbImage } from "../services/tmdb";

const CompanyCard = ({ data }: { data: any }) => {
  return (
    <Link to={`/company/${data?.id}`} className="">
      <div className="rounded-lg overflow-hidden aspect-thumbnail">
        <img src={getTmdbImage(data?.logo_path)} alt="" loading="lazy" />
      </div>
      <div className="p-3">
        <div className="font-semibold line-clamp-1">{data?.name}</div>
        <div className="text-xs">{data?.origin_country}</div>
      </div>
    </Link>
  );
};

export default memo(CompanyCard);
