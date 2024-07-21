import React, { FC } from "react";

interface IModal {
  open?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal: FC<IModal> = ({ onClose, open, children }) => {
  if (!open) return <></>;
  return (
    <div className="z-[1300] fixed inset-0 flex items-center justify-center p-2">
      <div
        onClick={onClose}
        className="-z-[1] bg-black/60 h-screen w-screen fixed inset-0"
      ></div>
      {children}
    </div>
  );
};

export default Modal;
