"use client";
import { userHeaderOptions } from "@/data/constants";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { HiPencilAlt } from "react-icons/hi";
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "./ui/button";

const UserOptions = () => {
  return (
    <div className="absolute top-full right-4 p-2 max-w-[250px] w-full border shadow-md bg-white z-50 rounded-md">
      {userHeaderOptions.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className="flex items-center gap-2 hover:bg-stone-100 px-4 py-2 rounded"
        >
          <span>{item.icon}</span>
          <span>{item.title}</span>
        </Link>
      ))}
      <hr className="my-4" />
      <SignOutButton>
        <button className="w-full flex items-center gap-2 hover:bg-stone-100 px-4 py-2 rounded">
          Signout
        </button>
      </SignOutButton>
    </div>
  );
};

const Header = () => {
  const [isUserOptions, setIsUserOptions] = useState(false);
  return (
    <div className="relative flex items-center justify-between p-4">
      <div></div>
      <div className="flex items-center gap-6">
        <Link
          href={`/search`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <IoSearchOutline size={20} />
        </Link>
        <Link
          href={`/me/blog/create`}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-black"
        >
          <HiPencilAlt size={20} />
        </Link>
        <Link
          href={`/me/notifications`}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
        >
          <FiBell size={20} />
        </Link>
        <SignedOut>
          <SignInButton>
            <Button>Signin</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <button
            onClick={() => setIsUserOptions(!isUserOptions)}
            // onFocus={() => setIsOptions(true)}
            onBlur={() => setIsUserOptions(false)}
            className="relative w-8 h-8 overflow-hidden rounded-full cursor-pointer"
          >
            <Image
              fill
              alt=""
              src={`https://miro.medium.com/v2/resize:fill:55:55/1*5R3sTJ1KZkaD9s6XmBNsQA@2x.jpeg`}
            />
          </button>
        </SignedIn>
      </div>
      {isUserOptions && <UserOptions />}
    </div>
  );
};

export default Header;
