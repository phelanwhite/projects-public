import React, { useMemo } from "react";
import { WiHumidity } from "react-icons/wi";
import { TiWaves } from "react-icons/ti";
import { MdVisibility } from "react-icons/md";
import { FaTemperatureThreeQuarters } from "react-icons/fa6";
import { getTimeZone, temperatureChangeC } from "utils/commons";
import { PiSunHorizonLight, PiSunHorizonFill } from "react-icons/pi";
import { FaEarthAsia, FaEarthOceania } from "react-icons/fa6";
const AirPollutionWeather = ({ weather, air }) => {
  const weatherData = useMemo(() => {
    const xlist = [
      {
        title: "Humidity",
        icon: <WiHumidity />,
        value: weather?.main?.humidity,
        util: "%",
      },
      {
        title: "Pressure",
        icon: <TiWaves />,
        value: weather?.main?.pressure,
        util: "hPa",
      },
      {
        title: "Visibility",
        icon: <MdVisibility />,
        value: Math.round(weather?.visibility / 1000),
        util: "km",
      },
      {
        title: "Feels like",
        icon: <FaTemperatureThreeQuarters />,
        value: temperatureChangeC(weather?.main?.feels_like),
        util: "<sup>o</sup>",
      },
    ];
    return xlist;
  }, [weather]);

  const sunriseSunsetData = useMemo(() => {
    const xlist = [
      {
        title: "Sunrise",
        icon: <PiSunHorizonLight />,
        value: getTimeZone(weather?.sys?.sunrise, weather?.timezone),
        // util: "%",
      },
      {
        title: "Sunset",
        icon: <PiSunHorizonFill />,
        value: getTimeZone(weather?.sys?.sunset, weather?.timezone),
        // util: "hPa",
      },
    ];
    return xlist;
  }, [weather]);

  const levelData = useMemo(() => {
    const xlist = [
      {
        title: "Sea level",
        icon: <FaEarthOceania />,
        value: weather?.main?.sea_level,
        util: "hPa",
      },
      {
        title: "Grnd level",
        icon: <FaEarthAsia />,
        value: weather?.main?.grnd_level,
        util: "hPa",
      },
    ];
    return xlist;
  }, [weather]);

  return (
    <div className="bg-[--darkColor2] p-6 rounded-lg">
      <div className="mb-4 font-semibold">Todays Highlights</div>
      <div className="bg-[--darkColor3] p-4 rounded-lg">
        <div className="mb-4 text-secondary text-xs">Air Quality index</div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
          {air?.list?.[0]?.components &&
            Object.entries(air?.list?.[0]?.components)?.map((item) => (
              <div key={item[0]}>
                <div className="mb-2 text-secondary text-xs">{item[0]}</div>
                <div className="text-xl">{item[1]}</div>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-6 grid gap-6 grid-cols-1 lg:grid-cols-2">
        <div className="bg-[--darkColor3] p-4 rounded-lg">
          <div className="mb-4 text-secondary text-xs">
            Sea level & Grnd level
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {levelData?.map((item) => (
              <div key={item.title} className="bg-[--darkColor3] rounded-lg">
                <div className="mb-4 text-secondary text-xs">{item.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-xl">
                    {item.value}
                    <span
                      dangerouslySetInnerHTML={{ __html: item.util }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-[--darkColor3] p-4 rounded-lg">
          <div className="mb-4 text-secondary text-xs">Sunrise & Sunset</div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {sunriseSunsetData?.map((item) => (
              <div key={item.title} className="bg-[--darkColor3] rounded-lg">
                <div className="mb-4 text-secondary text-xs">{item.title}</div>
                <div className="flex items-center justify-between">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-xl">
                    {item.value}
                    <span
                      dangerouslySetInnerHTML={{ __html: item.util }}
                    ></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {weatherData.map((item) => (
          <div key={item.title} className="bg-[--darkColor3] p-4 rounded-lg">
            <div className="mb-4 text-secondary text-xs">{item.title}</div>
            <div className="flex items-center justify-between">
              <div className="text-3xl">{item.icon}</div>
              <div className="text-xl">
                {item.value}
                <span dangerouslySetInnerHTML={{ __html: item.util }}></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirPollutionWeather;
