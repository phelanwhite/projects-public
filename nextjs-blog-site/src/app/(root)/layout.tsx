import Header from "@/components/layout/Header";
import React from "react";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className="py-6 max-w-[1320px] w-full px-4 mx-auto">{children}</div>
    </div>
  );
};

export default RootLayout;
