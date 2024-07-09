import React, { useEffect } from "react";
import WeatherCard from "./WeatherCard";
import { useQuery } from "@tanstack/react-query";
import { useLocationContext } from "contexts/locationContext";
import { openweathermapApi } from "utils/commons";
import { NavLink } from "react-router-dom";
import { FaCloudSun } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import Loader from "./Loader";
import { BiCurrentLocation } from "react-icons/bi";
const Slidebar = ({ open, close }) => {
  const { weatherList, handleChangeLocation } = useLocationContext();
  const getWeatherList = useQuery({
    queryKey: ["slidebar", weatherList],
    queryFn: async () => {
      const texts = await Promise.all(
        weatherList.map(async (location) => {
          const resp = await openweathermapApi(
            `data/2.5/weather?lat=${location.lat}&lon=${location.lon}`
          );
          return { ...resp, id: location.id };
        })
      );
      return texts;
    },
  });

  if (getWeatherList.isLoading) return <Loader />;

  return (
    <div className="z-20 fixed top-0 left-0 bottom-0 right-0 bg-black/50">
      <div className="max-w-[600px] w-full h-screen overflow-y-auto bg-[--darkColor1] p-4">
        <div className="flex items-center justify-between gap-8">
          <div className="flex items-center gap-4">
            <NavLink
              to={`/`}
              className={`hidden md:flex items-center gap-2 text-2xl font-semibold`}
            >
              <FaCloudSun />
              <div>
                Phelan<span className="text-blue-500">Weather</span>
              </div>
            </NavLink>
            <button
              onClick={handleChangeLocation}
              className="btn rounded-full bg-purple-500"
            >
              <BiCurrentLocation />
              CurrentLocation
            </button>
          </div>

          <button onClick={close}>
            <IoMdClose size={24} />
          </button>
        </div>
        <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2">
          {getWeatherList.data?.map((item) => (
            <WeatherCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slidebar;
