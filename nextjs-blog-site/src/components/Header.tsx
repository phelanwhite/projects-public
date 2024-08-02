import React from "react";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { headerLinks } from "@/data/constants";
import Link from "next/link";

const Header = () => {
  return (
    <div className="sticky z-50 bg-bgColor top-0 left-0 right-0 shadow p-8">
      <div className="flex items-center justify-between">
        <div>Logo</div>
        <div className="hidden text-base text-textColor2 md:flex items-center justify-center gap-4">
          {headerLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Header;
