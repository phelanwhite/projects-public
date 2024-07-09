import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useCallback, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FaSearch } from "react-icons/fa";

const HomePage = () => {
  const countries = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      const resp = await (
        await axios.get(`https://restcountries.com/v3.1/all`)
      ).data;
      return resp;
    },
  });
  const getRegion = useMemo(() => {
    if (countries?.data) {
      const regions = countries?.data?.map((item) => item?.region);
      return Array.from(new Set(regions)).sort();
    }
    return [];
  }, [countries]);
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    region: "all",
  });
  const handleSearchParams = useCallback(
    (name, value) => {
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
  const countriesResult = useMemo(() => {
    return countries.data?.filter((countrie) => {
      if (
        searchParams.get("region").toLocaleLowerCase() ===
        "all".toLocaleLowerCase()
      ) {
        return countrie.name?.common
          ?.toLowerCase()
          ?.includes(searchParams.get("search")?.toLowerCase());
      } else {
        return (
          countrie.name?.common
            ?.toLowerCase()
            ?.includes(searchParams.get("search")?.toLowerCase()) &&
          countrie.region?.toLocaleLowerCase() ===
            searchParams.get("region").toLocaleLowerCase()
        );
      }
    });
  }, [countries, searchParams]);

  if (countries.isLoading) return <Loader />;
  return (
    <div className="text-[14px]">
      <div className="wrapper">
        <div className="mb-8 flex gap-8 items-center justify-between flex-col sm:flex-row">
          <div className="input-box sm:max-w-[500px]">
            <FaSearch />
            <input
              value={searchParams.get("search")}
              onChange={(e) => handleSearchParams("search", e.target.value)}
              placeholder="Search for a country..."
              type="text"
              className="bg-transparent border-none outline-none w-full"
            />
          </div>
          <select
            className="input-box sm:max-w-[200px]"
            value={searchParams.get("region")}
            onChange={(e) => handleSearchParams("region", e.target.value)}
          >
            <option value="all">All</option>
            {getRegion?.map((region) => {
              return <option key={region}>{region}</option>;
            })}
          </select>
        </div>
        <div className="grid gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {countriesResult?.map((country) => {
            return (
              <Link
                to={`/${country?.cca2}`}
                key={country?.name?.common}
                className="bg-dark shadow rounded overflow-hidden"
              >
                <div className="aspect-video">
                  <img src={country?.flags?.png} alt={country?.name?.common} />
                </div>
                <div className="p-4 flex flex-col gap-1">
                  <div className="text-base font-semibold">
                    {country?.name?.common}
                  </div>
                  <div>
                    <span className="font-semibold">Population: </span>
                    <span>{country?.population}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Region: </span>
                    <span>{country?.region}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Capital: </span>
                    <span>{country?.capital?.join(", ")}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
