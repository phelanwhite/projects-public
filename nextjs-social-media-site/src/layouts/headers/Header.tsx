"use client";
import { Button } from "@/components/ui/button";
import { menuHeader } from "@/constants/menuLink";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Header = () => {
  const pathName = usePathname();
  console.log({ pathName });

  return (
    <div className="z-50 py-4 bg-white shadow sticky top-0 left-0 right-0">
      <div className="wrapper">
        <div className="flex justify-between gap-6">
          <div className="max-w-[300px] w-full">
            <Link href={`/`} className="font-semibold text-xl">
              Phelan<span className="text-blue-500">Social</span>
            </Link>
          </div>
          <div className="flex-1 flex items-center">
            {menuHeader.map((item) => (
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
          <SignedOut>
            <SignInButton>
              <Button size={"sm"}>Signin</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button size={"sm"}>Signout</Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </div>
  );
};

export default Header;
