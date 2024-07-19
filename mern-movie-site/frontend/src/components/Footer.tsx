import { memo } from "react";

const Footer = () => {
  return (
    <div className="bg-[rgb(3,37,65)] text-white">
      <div className="wrapper">
        <div className="text-center text-xs py-4 ">
          <p>�� 2023 All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default memo(Footer);
