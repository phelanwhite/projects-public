import React from "react";
import style from "./style.module.css";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 z-30 bg-black/50 flex items-center justify-center">
      <span className={style.loader}></span>
    </div>
  );
};

export default Loader;
