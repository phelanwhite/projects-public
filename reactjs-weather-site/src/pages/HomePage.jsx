import { useQuery } from "@tanstack/react-query";
import React from "react";
import CurrentWeather from "components/CurrentWeather";
import ForecastDayWeather from "components/ForecastDayWeather";
import ForecastListWeather from "components/ForecastListWeather";
import AirPollutionWeather from "components/AirPollutionWeather";
import { openweathermapApi } from "utils/commons";
import { useLocationContext } from "contexts/locationContext";
import Loader from "components/Loader";

const HomePage = () => {
  const { location } = useLocationContext();

  const weather_current = useQuery({
    queryKey: ["home", "weather_current", location],
    queryFn: async () => {
      const resp = await openweathermapApi(
        `data/2.5/weather?lat=${location.lat}&lon=${location.lon}`
      );
      return resp;
    },
  });
  const weather_forecast = useQuery({
    queryKey: ["home", "weather_forecast", location],
    queryFn: async () => {
      const resp = await openweathermapApi(
        `data/2.5/forecast?lat=${location.lat}&lon=${location.lon}`
      );
      return resp;
    },
  });
  const weather_air = useQuery({
    queryKey: ["home", "weather_air", location],
    queryFn: async () => {
      const resp = await openweathermapApi(
        `data/2.5/air_pollution?lat=${location.lat}&lon=${location.lon}`
      );
      return resp;
    },
  });
  //   console.log({ weather_current, weather_forecast, weather_air });
  if (
    weather_air.isLoading ||
    weather_air.isLoading ||
    weather_forecast.isLoading
  )
    return <Loader />;
  return (
    <div className="wrapper flex flex-col md:flex-row gap-6 py-8">
      <div className="md:max-w-[300px] w-full flex flex-col gap-3">
        <CurrentWeather data={weather_current.data} />
        <div className="capitalize font-semibold">5 days forecast</div>
        <ForecastDayWeather data={weather_forecast.data} />
      </div>
      <div className="flex-1 flex flex-col gap-3 overflow-hidden">
        <AirPollutionWeather
          weather={weather_current.data}
          air={weather_air.data}
        />
        <div className="capitalize font-semibold">Today at</div>
        <ForecastListWeather data={weather_forecast.data} />
      </div>
    </div>
  );
};

export default HomePage;
