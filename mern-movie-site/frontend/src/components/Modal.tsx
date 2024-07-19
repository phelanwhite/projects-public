import { FC, memo } from "react";

interface IModal {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: FC<IModal> = (props) => {
  if (!props.open) return <></>;
  return (
    <div className="z-[1300] fixed inset-0 px-4 flex items-center justify-center">
      <div
        onMouseDown={props.onClose}
        aria-hidden="true"
        className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 transition -z-[1]"
      ></div>
      {props.children}
    </div>
  );
};

export default memo(Modal);
