import BrithdayRequests from "@/components/birthday/BrithdayRequests";
import FriendRequests from "@/components/friend/FriendRequests";
import ProfileCard from "@/components/user/ProfileCard";
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
          <ProfileCard />
          <MenuLeft />
        </div>
        <div className="flex-1 overflow-hidden">{children}</div>
        <div className="max-w-[300px] w-full space-y-6 hidden md:block">
          <BrithdayRequests />
          <FriendRequests />
        </div>
      </div>
    </main>
  );
}
