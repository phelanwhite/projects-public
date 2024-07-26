import { categories } from "@/assets/constant";
import React from "react";
import { NavLink } from "react-router-dom";

const SidebarLeft = () => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="text-base font-semibold mb-4 px-4">Danh mục</div>
      <ul>
        {categories.map((category) => (
          <NavLink
            key={category.value}
            to={category.value}
            className={`flex items-center gap-3 text-black px-4 py-2 rounded-md hover:bg-blue-100`}
          >
            <div className="w-8">
              <img src={category.image} loading="lazy" alt="" />
            </div>
            <div>{category.title}</div>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};

export default SidebarLeft;
