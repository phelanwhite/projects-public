import React from "react";

const Loader = () => {
  return (
    <div className="z-[1000] fixed top-0 left-0 right-0 bottom-0 bg-black/50 flex items-center justify-center">
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
