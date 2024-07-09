import React, { useMemo } from "react";
import { getIconWeather, temperatureChangeC } from "utils/commons";

const ForecastDayWeather = ({ data }) => {
  const weatherList = useMemo(() =>
    data?.list?.filter((item, index) => index % 8 === 0)
  );

  return (
    <div className="bg-[--darkColor2] p-6 rounded-lg">
      {weatherList?.map((item) => (
        <div key={item?.dt} className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div>
              <img
                src={getIconWeather(item?.weather?.[0]?.icon)}
                loading=""
                alt=""
              />
            </div>
            <div>
              {temperatureChangeC(item?.main?.temp)}
              <sup>o</sup>
            </div>
          </div>
          <div className="text-secondary text-xs">
            {Intl.DateTimeFormat("en-GB", { day: "numeric" }).format(
              new Date(item?.dt_txt)
            )}{" "}
            {Intl.DateTimeFormat("en-GB", { month: "short" }).format(
              new Date(item?.dt_txt)
            )}
          </div>
          <div className="text-secondary text-xs">
            {Intl.DateTimeFormat("en-GB", { weekday: "short" }).format(
              new Date(item?.dt_txt)
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ForecastDayWeather;
