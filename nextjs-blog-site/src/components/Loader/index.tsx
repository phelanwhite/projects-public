import { Spin } from "antd";
import React from "react";

const contentStyle: React.CSSProperties = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};
const content = <div style={contentStyle} />;

const Loader = () => {
  return (
    <div className="fixed z-[1000] inset-0 h-screen w-screen bg-black/50 flex justify-center items-center">
      <Spin>{content}</Spin>
    </div>
  );
};

export default Loader;
