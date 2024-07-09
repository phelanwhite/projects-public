import React from "react";
import { getIconWeather, temperatureChangeC } from "utils/commons";
import { FaCalendar } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
const CurrentWeather = ({ data }) => {
  return (
    <div className="bg-[--darkColor2] p-6 rounded-lg">
      <div className="title-3">Now</div>
      <div className="flex items-center justify-between">
        <div className="title-1 font-semibold">
          {temperatureChangeC(data?.main?.temp)}
          <sup>o</sup>
        </div>
        <div>
          <img
            src={getIconWeather(data?.weather?.[0]?.icon, `@2x`)}
            loading="lazy"
            alt=""
          />
        </div>
      </div>
      <div className="capitalize">{data?.weather?.[0]?.description}</div>
      <hr className="my-4" />
      <div className="text-xs">
        <div className="flex items-center gap-2">
          <FaCalendar size={16} />
          <span className="text-secondary">{new Date().toDateString()}</span>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <MdLocationOn size={16} />
          <span className="text-secondary">
            {data?.name}, {data?.sys?.country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
