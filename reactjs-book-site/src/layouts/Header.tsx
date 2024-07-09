import React from "react";
import { Link } from "react-router-dom";

// const headerMenuLink = [
//   {
//     name: "Bookmarks",
//     link: "/bookmarks",
//   },
// ];

const Header = () => {
  return (
    <div className="sticky top-0 left-0 right-0 bg-white py-2 shadow z-30">
      <div className="wrapper">
        <div className="flex items-center justify-between">
          <Link to={`/`} className="font-semibold text-xl">
            PhelanBook
          </Link>
          {/* <div className="flex items-center gap-4 font-semibold">
            {headerMenuLink.map((item, index) => {
              return (
                <div key={index}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) => [``].join(" ")}
                  >
                    {item.name}
                  </NavLink>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
