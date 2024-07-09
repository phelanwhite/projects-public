import React, { useMemo } from "react";
import Loader from "../components/Loader";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const CountryId = () => {
  const { id } = useParams();
  const country = useQuery({
    queryKey: ["country-id", id],
    queryFn: async () => {
      const resp = await (
        await axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
      ).data;
      return resp;
    },
  });
  const getCountry = useMemo(() => country.data?.[0], [country]);
  if (country.isLoading) return <Loader />;
  return (
    <div className="wrapper ">
      <div>
        <Link to={`/`} className="btn shadow w-max">
          <FaArrowLeft />
          Back
        </Link>
      </div>
      <div className="mt-4 flex flex-col md:flex-row md:items-center gap-8">
        <div className="sm:max-w-[300px] md:max-w-[400px] w-full mx-auto">
          <img src={getCountry?.flags?.png} alt={getCountry?.flags?.alt} />
        </div>
        <div className="flex-1">
          <div className="text-xl font-semibold">
            {getCountry?.name?.common}
          </div>
          <div className="my-8 grid gap-x-8 gap-y-4 grid-cols-1 sm:grid-cols-2">
            <div>
              <span className="font-semibold">Native Name: </span>
              <span>
                {getCountry?.name?.nativeName &&
                  Object.values(getCountry?.name?.nativeName)
                    ?.map((item) => item?.common)
                    ?.join(", ")}
              </span>
            </div>
            <div>
              <span className="font-semibold">Top Level Domain: </span>
              <span>{getCountry?.tld?.join(", ")}</span>
            </div>
            <div>
              <span className="font-semibold">Population: </span>
              <span>
                {getCountry?.population &&
                  Intl.NumberFormat("vn-VN").format(getCountry?.population)}
              </span>
            </div>
            <div>
              <span className="font-semibold">Currencies: </span>
              <span>
                {getCountry?.currencies &&
                  Object.values(getCountry?.currencies).map(
                    (item) => item?.name
                  )}
              </span>
            </div>

            <div>
              <span className="font-semibold">Region: </span>
              <span>{getCountry?.region}</span>
            </div>
            <div>
              <span className="font-semibold">Languages: </span>
              <span>
                {getCountry?.languages &&
                  Object.values(getCountry?.languages).join(", ")}
              </span>
            </div>
            <div>
              <span className="font-semibold">Subregion: </span>
              <span>{getCountry?.subregion}</span>
            </div>
            <div>
              <span className="font-semibold">Capital: </span>
              <span>{getCountry?.capital?.join(`, `)}</span>
            </div>
          </div>
          <div className="flex gap-x-4 gap-y-2 flex-wrap">
            <span className="font-semibold">Borders Countries</span>
            {getCountry?.borders?.map((item) => {
              return (
                <Link
                  to={`/${item}`}
                  className="btn px-6 py-1 bg-dark shadow"
                  key={item}
                >
                  {item}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryId;
