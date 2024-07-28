import React from "react";

const LayoutMe = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="max-w-[1332px] w-full mx-auto px-4 min-h-screen py-8">
      {children}
    </div>
  );
};

export default LayoutMe;
