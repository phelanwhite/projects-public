import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
const Header = () => {
  const [theme, setTheme] = useState(() => {
    const localTheme = JSON.parse(localStorage.getItem("theme"));
    return localTheme ? localTheme : false;
  });

  useEffect(() => {
    if (theme) {
      document.querySelector("body").setAttribute("data-theme", "dark");
    } else {
      document.querySelector("body").setAttribute("data-theme", "");
    }
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <div className="sticky top-0 left-0 right-0 shadow-md py-4 z-10 bg-[--bgColor]">
      <div className="wrapper">
        <div className="flex items-center justify-between gap-6">
          <NavLink to={`/`} className={`text-xl font-semibold capitalize`}>
            where in the world?
          </NavLink>
          {theme ? (
            <button
              onClick={() => setTheme(false)}
              className="flex items-center gap-2"
            >
              <FaSun />
              Light Mode
            </button>
          ) : (
            <button
              onClick={() => setTheme(true)}
              className="flex items-center gap-2"
            >
              <FaMoon />
              Dark Mode
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
