import { Link, NavLink } from "react-router-dom";
import { IoIosCloseCircle } from "react-icons/io";
import { menuHeaderLink } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { useLoggoutMutation } from "../stores/authApi ";
import { setCurrentUser } from "../stores/authSlice";
import { memo } from "react";
const SidebarTop = ({
  handleClose,
  open,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const disptach = useDispatch();
  const [loggout] = useLoggoutMutation();
  const user = useSelector((state: any) => state?.authSlice?.currentUser);

  if (!open) return <></>;
  return (
    <div className="relative max-w-[500px] w-full p-6 py-10 rounded-lg bg-white text-black flex flex-col gap-2 items-center">
      <button onClick={handleClose} className="absolute top-4 right-4">
        <IoIosCloseCircle size={20} />
      </button>
      {menuHeaderLink.map((link) => (
        <NavLink
          onClick={handleClose}
          key={link.title}
          to={link.path}
          className={({ isActive }) =>
            [
              `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
              isActive && `text-red-500 bg-gray-100`,
            ].join(" ")
          }
        >
          {link.title}
        </NavLink>
      ))}
      <NavLink
        onClick={handleClose}
        to={`/update-me`}
        className={({ isActive }) =>
          [
            `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
            isActive && `text-red-500 bg-gray-100`,
          ].join(" ")
        }
      >
        Update Me
      </NavLink>
      <NavLink
        onClick={handleClose}
        to={`/my-list`}
        className={({ isActive }) =>
          [
            `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
            isActive && `text-red-500 bg-gray-100`,
          ].join(" ")
        }
      >
        My list
      </NavLink>
      <NavLink
        onClick={handleClose}
        to={`/my-favorite`}
        className={({ isActive }) =>
          [
            `block font-semibold px-4 py-2 rounded-lg text-center  hover:bg-gray-100`,
            isActive && `text-red-500 bg-gray-100`,
          ].join(" ")
        }
      >
        My Favorite
      </NavLink>
      {user ? (
        <button
          onClick={() => {
            loggout(``);
            disptach(setCurrentUser(null));
            handleClose();
          }}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white"
        >
          Signout
        </button>
      ) : (
        <Link
          onClick={handleClose}
          to={`/login`}
          className="px-4 py-2 rounded-lg text-sm bg-blue-600 hover:bg-blue-500 text-white"
        >
          Signin
        </Link>
      )}
    </div>
  );
};

export default memo(SidebarTop);
