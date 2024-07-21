"use client";
import { menuLink } from "@/constants/menuLink";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MenuLeft = () => {
  const pathName = usePathname();
  console.log({ pathName });

  return (
    <div className="bg-white shadow rounded py-4">
      <div className="flex flex-col">
        {menuLink.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className={[
              `flex items-center gap-2 text-sm px-4 py-2 rounded font-semibold text-gray-500 hover:bg-stone-100`,
              pathName === item.href && `bg-stone-100 text-blue-500`,
            ].join(" ")}
          >
            <span className="text-xl">{item.icon}</span>{" "}
            <span>{item.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MenuLeft;
