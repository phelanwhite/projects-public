import { Link } from "react-router-dom";
import { MdSearch } from "react-icons/md";
import { IoMdCart } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "antd";
import useAuthStore from "@/stores/auth-store";

const Header = () => {
  const { user } = useAuthStore();
  return (
    <div className="sticky top-0 left-0 right-0 py-4 bg-white shadow z-50">
      <div className="wrapper flex items-center justify-between">
        <Link to={`/`} className="text-xl">
          Phonestore
        </Link>
        <div className="text-2xl flex items-center gap-4">
          <Link to={`/search`} className="text-black ">
            <MdSearch />
          </Link>
          <Link to={`/cart`} className="text-black relative">
            <div className="absolute -top-3 -right-1.5 px-1.5 py-1 rounded-full overflow-hidden bg-red-500 text-white text-[10px] leading-none flex items-center justify-center">
              0
            </div>
            <IoMdCart />
          </Link>
          {!user ? (
            <Link to={`/signin`}>
              <Button type="primary">Signin</Button>
            </Link>
          ) : (
            <Link to={`/account`} className="text-black hidden md:block">
              <FaUserCircle size={22} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
