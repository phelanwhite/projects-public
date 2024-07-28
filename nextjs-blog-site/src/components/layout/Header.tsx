"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import { FaRegBell, FaRegNewspaper } from "react-icons/fa";
import { FaUserPen } from "react-icons/fa6";
import { MdFavoriteBorder, MdSearch } from "react-icons/md";
import { PiSignOutLight } from "react-icons/pi";
import { VscLibrary } from "react-icons/vsc";

const headerMenuLinks = {
  list1: [
    { title: `Profile`, path: `/profile`, icon: <FaUserPen /> },
    { title: `Library`, path: `/library`, icon: <VscLibrary /> },
    { title: `Blogs`, path: `/blog`, icon: <FaRegNewspaper /> },
    { title: `Favorite`, path: `/favorite`, icon: <MdFavoriteBorder /> },
  ],
  list2: [
    { title: `Settings`, path: `/settings` },
    { title: `Refine recommendations`, path: `/refine-recommendations` },
    { title: `Manage publications`, path: `/manage-publications` },
    { title: `Help`, path: `/help` },
  ],
};

const AuthOption = () => {
  return (
    <div className="z-50 absolute right-4 -bottom-[424px] bg-white text-secondary font-semibold rounded border w-[265px]">
      <div className="py-4 border-b">
        {headerMenuLinks.list1.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className="flex items-center gap-4 px-6 py-2 hover:bg-stone-100 w-full"
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="py-4 border-b">
        {headerMenuLinks.list2.map((item) => (
          <Link
            key={item.title}
            href={item.path}
            className="flex items-center gap-4 px-6 py-2 hover:bg-stone-100 w-full"
          >
            <span className="text-sm">{item.title}</span>
          </Link>
        ))}
      </div>
      <div className="py-4">
        <SignedIn>
          <SignOutButton>
            <button className="flex items-center gap-4 px-6 py-2 hover:bg-stone-100 w-full">
              <PiSignOutLight />
              <span className="text-sm">Signout</span>
            </button>
          </SignOutButton>
        </SignedIn>
      </div>
    </div>
  );
};

const Header = () => {
  const [isOpenOptions, setIsOpenOptions] = useState(false);
  const { isSignedIn } = useUser();

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="sticky top-0 left-0 right-0 flex items-center justify-between p-4 bg-white z-50 shadow">
      <Link href={`/`} className="font-semibold text-xl">
        Blog
      </Link>
      <div className="flex items-center gap-6">
        <Link href={`/new-log`} className="inline-block">
          <button>
            <BsPencilSquare size={20} />
          </button>
        </Link>
        <Link href={`/search`} className="inline-block">
          <button>
            <MdSearch size={24} />
          </button>
        </Link>
        <Link href={`/me/notifications`} className="inline-block">
          <button>
            <FaRegBell size={20} />
          </button>
        </Link>

        {/* login and logout */}
        {!isSignedIn && isClient && (
          <SignInButton>
            <Button type="primary">Signin</Button>
          </SignInButton>
        )}
        {isSignedIn && (
          <div
            onClick={() => {
              setIsOpenOptions(!isOpenOptions);
            }}
            // onBlur={() => setIsOpenOptions(false)}
            className="relative w-8 h-8 rounded-full overflow-hidden cursor-pointer"
          >
            <Image
              fill
              loading="lazy"
              alt=""
              src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9hN28VhVYenw0Og7z1j95n6hQDYw6lMriBA&s`}
            />
          </div>
        )}
        {isSignedIn && isOpenOptions && <AuthOption />}
      </div>
    </div>
  );
};

export default Header;
