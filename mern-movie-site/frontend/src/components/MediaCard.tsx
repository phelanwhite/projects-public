import { memo } from "react";
import { getTmdbImage } from "../services/tmdb";
import { Link } from "react-router-dom";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const MediaCard = ({
  data,
  media_type,
}: {
  data: any;
  media_type?: string;
}) => {
  return (
    <Link
      to={`/media/${data?.id}?media_type=${data?.media_type || media_type}`}
      className=""
    >
      <div className="relative">
        <div className="aspect-thumbnail overflow-hidden rounded-lg">
          <img src={getTmdbImage(data?.poster_path)} alt="" loading="lazy" />
        </div>
        <div className="bg-[rgb(8,28,34)]  w-10 h-10 overflow-hidden rounded-full absolute -bottom-5 left-3">
          <CircularProgressbar
            value={data?.vote_average * 10}
            text={`${Math.round(Number(data.vote_average) * 10)}%`}
            styles={buildStyles({
              textColor: `white`,
              textSize: `24px`,
              pathColor: `rgb(22, 163, 74, 1)`,
              trailColor: `rgba(229, 231, 235, 1)`,
              backgroundColor: `#081C22`,
              pathTransitionDuration: 0.5,
            })}
          />
        </div>
      </div>
      <div className="pt-6 px-3">
        <div className="font-semibold line-clamp-2 leading-5 hover:text-blue-500">
          {data?.title || data?.name}
        </div>
      </div>
    </Link>
  );
};

export default memo(MediaCard);
