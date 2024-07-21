import UserFeatured from "@/components/user/UserFeatured";
import UserInfo from "@/components/user/UserInfo";
import MenuLeft from "@/layouts/menus/MenuLeft";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="wrapper">
      <div className="flex items-start gap-6">
        <div className="max-w-[300px] w-full space-y-6 hidden md:block">
          <MenuLeft />
        </div>
        <div className="flex-1">{children}</div>
        <div className="max-w-[300px] w-full space-y-6 hidden md:block">
          <UserInfo />
          <UserFeatured />
        </div>
      </div>
    </main>
  );
}
