import { useQuery } from "@tanstack/react-query";
import React, { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { openweathermapApi } from "utils/commons";
import { FaLocationArrow } from "react-icons/fa";
import { useLocationContext } from "contexts/locationContext";
import Loader from "./Loader";
const SearchTerm: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => {
  const { setLocation } = useLocationContext();
  const [value, setValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [isSearchValue, setIsSearchValue] = useState(false);

  useEffect(() => {
    const debounce = setTimeout(() => {
      setSearchValue(value);
    }, 1000);
    return () => clearTimeout(debounce);
  }, [value]);

  const searchList = useQuery({
    queryKey: ["search", searchValue],
    queryFn: async () => {
      const resp =
        searchValue &&
        (await openweathermapApi(`geo/1.0/direct?q=${searchValue}&limit=5`));
      return resp;
    },
  });
  if (searchList.isLoading) return <Loader />;

  return (
    <div className={[`relative`, className].join(" ")}>
      <div
        className={[
          `px-4 rounded-full flex items-center gap-2 bg-[--darkColor2]`,
        ].join(" ")}
      >
        <IoSearch />
        <input
          onFocus={() => setIsSearchValue(true)}
          onBlur={() => setIsSearchValue(false)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          placeholder="Search city..."
          className="border-none outline-none py-2 bg-transparent w-full"
          {...props}
        />
      </div>
      {isSearchValue && (
        <div className="shadow-lg mt-2 absolute top-full left-0 w-full bg-[--darkColor2] rounded-lg overflow-hidden">
          {searchList.data?.length > 0 &&
            searchList.data?.map((item: any, index: any) => (
              <div
                onMouseDown={(e) => {
                  e.preventDefault();
                  const newLocation = {
                    lat: item?.lat,
                    lon: item?.lon,
                  };
                  setLocation(newLocation);
                }}
                key={index}
                className="cursor-pointer hover:bg-[--darkColor3] flex items-center gap-2 px-4 py-2 "
              >
                <FaLocationArrow />
                <div>
                  <div>
                    {item?.name}{" "}
                    {item?.state && (
                      <span className="text-xs text-secondary">
                        ({item?.state})
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-secondary">{item?.country}</div>
                </div>
              </div>
            ))}
          {searchList.data?.length === 0 && (
            <div className="cursor-pointer hover:bg-[--darkColor3] flex items-center gap-2 px-4 py-2 ">
              Not found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchTerm;
