import { MdDashboard, MdHome } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";

const MenuBottom = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white z-50 md:hidden grid grid-cols-4 shadow text-[10px] sm:text-xs ">
      <NavLink
        to={`/`}
        className={({ isActive }) =>
          [
            `w-full flex flex-col gap-1 items-center  hover:bg-blue-100 py-2 px-2`,
            isActive ? `bg-blue-100 text-black` : `text-gray-500`,
          ].join(" ")
        }
      >
        <MdHome size={20} />
        <span>Home</span>
      </NavLink>
      <NavLink
        to={`/category`}
        className={({ isActive }) =>
          [
            `w-full flex flex-col gap-1 items-center  hover:bg-blue-100 py-2 px-2`,
            isActive ? `bg-blue-100 text-black` : `text-gray-500`,
          ].join(" ")
        }
      >
        <MdDashboard size={20} />
        <span>Category</span>
      </NavLink>
      <NavLink
        to={`/cart`}
        className={({ isActive }) =>
          [
            `w-full flex flex-col gap-1 items-center  hover:bg-blue-100 py-2 px-2`,
            isActive ? `bg-blue-100 text-black` : `text-gray-500`,
          ].join(" ")
        }
      >
        <IoMdCart size={20} />
        <span>Cart</span>
      </NavLink>
      <NavLink
        to={`/account`}
        className={({ isActive }) =>
          [
            `w-full flex flex-col gap-1 items-center  hover:bg-blue-100 py-2 px-2`,
            isActive ? `bg-blue-100 text-black` : `text-gray-500`,
          ].join(" ")
        }
      >
        <FaUserCircle size={20} />
        <span>Account</span>
      </NavLink>
    </div>
  );
};

export default MenuBottom;
