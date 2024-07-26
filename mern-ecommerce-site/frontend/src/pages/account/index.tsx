import { userLinks } from "@/assets/constant";
import useAuthStore from "@/stores/auth-store";
import { NavLink, Outlet } from "react-router-dom";
import { PiSignOut } from "react-icons/pi";

const AccountPage = () => {
  const { user } = useAuthStore();
  console.log({ user });

  return (
    <div className="flex items-start gap-6">
      <div className="space-y-4 w-full lg:max-w-[300px]">
        <div className="bg-white rounded-lg p-4 flex items-start gap-2">
          <div className="w-10 h-10 overflow-hidden rounded-full border">
            <img src={user?.avatar} loading="lazy" alt="" />
          </div>
          <div className="flex-1 text-xs">
            <div className="text-sm mb-1">{user?.email}</div>
            <div className="text-gray-500 ">
              Member since: {new Date(user?.createdAt).toDateString()}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4">
          {userLinks.map((link) => (
            <NavLink
              to={link.to}
              key={link.to}
              className={[
                `flex items-center gap-4 px-4 py-3 rounded-md text-black hover:bg-blue-100 border-b last:border-none`,
              ].join(" ")}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.title}</span>
            </NavLink>
          ))}
          <NavLink
            to={`/signin`}
            className={[
              `flex items-center gap-4 px-4 py-3 rounded-md text-black hover:bg-blue-100 border-b last:border-none`,
            ].join(" ")}
          >
            <span className="text-xl">
              <PiSignOut />
            </span>
            <span>Signout</span>
          </NavLink>
        </div>
      </div>
      <div className="hidden lg:block flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AccountPage;
