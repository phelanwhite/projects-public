import React, { useState } from "react";
import SearchTerm from "./SearchTerm";
import { NavLink } from "react-router-dom";
import { BiCurrentLocation } from "react-icons/bi";
import { FaCloudSun } from "react-icons/fa";
import { IoMenu, IoSearch } from "react-icons/io5";
import { MdAddLocationAlt } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useLocationContext } from "contexts/locationContext";
import Slidebar from "./Slidebar";
const Header = () => {
  const { handleChangeLocation, addWeather } = useLocationContext();
  const [isSlidebar, setIsSlidebar] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  return (
    <div className="py-4 shadow">
      <div className="wrapper">
        <div className="flex items-center justify-between gap-8">
          <NavLink
            to={`/`}
            className={`flex items-center gap-2 text-xl md:text-2xl font-semibold`}
          >
            <FaCloudSun />
            <div>
              Phelan<span className="text-blue-500">Weather</span>
            </div>
          </NavLink>
          <SearchTerm className="hidden lg:block max-w-[500px] w-full" />
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSearch(true)}>
              <IoSearch size={24} />
            </button>
            <button onClick={addWeather}>
              <MdAddLocationAlt size={24} />
            </button>
            <div className="hidden md:block">
              <button
                onClick={handleChangeLocation}
                className="btn rounded-full bg-purple-500"
              >
                <BiCurrentLocation />
                CurrentLocation
              </button>
            </div>
            <button onClick={() => setIsSlidebar(true)}>
              <IoMenu size={24} />
            </button>
          </div>
        </div>
      </div>
      {isSlidebar && <Slidebar close={() => setIsSlidebar(false)} />}
      {isSearch && (
        <div className="z-20 fixed top-0 left-0 bottom-0 right-0 p-4 bg-black/50">
          <button
            onClick={() => setIsSearch(false)}
            className="absolute z-10 left-8 top-7 bg-[--darkColor2]"
          >
            <FaArrowLeft />
          </button>
          <SearchTerm />
        </div>
      )}
    </div>
  );
};

export default Header;
