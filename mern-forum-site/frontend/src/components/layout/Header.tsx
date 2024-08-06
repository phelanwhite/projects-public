import { useAuthStore } from "@/store/auth-store";
import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import {
  BellOutlined,
  FormOutlined,
  HeartOutlined,
  HistoryOutlined,
  LogoutOutlined,
  SearchOutlined,
  SettingOutlined,
  SnippetsOutlined,
  UserOutlined,
  WarningOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useMessageContext } from "@/contexts/MessageContext";

const optinos = {
  list1: [
    {
      icon: <UserOutlined />,
      text: "Profile",
      path: "/update-me",
    },
    {
      icon: <FormOutlined />,
      text: "Write",
      path: "/post-create",
    },
    {
      icon: <SnippetsOutlined />,
      text: "Library",
      path: "/library",
    },
    {
      icon: <HeartOutlined />,
      text: "Favorite",
      path: "/favorite",
    },
    {
      icon: <HistoryOutlined />,
      text: "Stories",
      path: "/stories",
    },
  ],
  list2: [
    {
      icon: <SettingOutlined />,
      text: "Setting",
      path: "/setting",
    },
    {
      icon: <WarningOutlined />,
      text: "Help",
      path: "/help",
    },
  ],
  list3: [
    {
      icon: <SearchOutlined />,
      text: "Search",
      path: "/search",
    },
    {
      icon: <BellOutlined />,
      text: "Bell",
      path: "/bell",
    },
  ],
};

const AuthOptions = () => {
  const { messageApi } = useMessageContext();
  const { signout } = useAuthStore();
  const signoutResult = useMutation({
    mutationFn: async () => {
      const result = await signout();
      return result;
    },
    onSuccess(data) {
      messageApi.open({
        type: "success",
        content: data?.message,
      });
    },
    onError(error) {
      messageApi.open({
        type: "error",
        content: error.message,
      });
    },
  });
  return (
    <>
      <div className="absolute right-0 top-full mt-2 p-4 rounded border bg-white w-[245px] text-sm font-medium text-secondary">
        <ul className="border-b pb-4 mb-4">
          {optinos.list1.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  [
                    `py-1 hover:text-black flex items-center gap-3`,
                    isActive && `text-black`,
                  ].join(" ")
                }
                to={item.path}
                onMouseDown={() => window.location.replace(item.path)}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="border-b pb-4 mb-4">
          {optinos.list2.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  [
                    `py-1 hover:text-black flex items-center gap-3`,
                    isActive && `text-black`,
                  ].join(" ")
                }
                to={item.path}
                onMouseDown={() => window.location.replace(item.path)}
              >
                <span>{item.icon}</span>
                <span>{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="flex flex-col ">
          <li
            className="py-1 hover:text-black flex items-center gap-3"
            // onClick={() => signoutResult.mutate()}
            onMouseDown={() => signoutResult.mutate()}
          >
            <LogoutOutlined />
            <span>Signout</span>
          </li>
        </ul>
      </div>
    </>
  );
};
const Header = () => {
  const { user } = useAuthStore();

  const [isOpenOptions, setIsOpenOptions] = useState(false);

  return (
    <>
      <div className="z-50 flex items-center justify-between p-4 sticky shadow ">
        <Link to={`/`} className="text-xl font-semibold">
          Phelan Forum
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {optinos.list3.map((item) => (
              <li key={item.path}>
                <NavLink
                  className={({ isActive }) =>
                    [
                      `py-1 hover:text-black flex items-center gap-3`,
                      isActive && `text-black`,
                    ].join(" ")
                  }
                  to={item.path}
                  onMouseDown={() => window.location.replace(item.path)}
                >
                  <span className="text-[20px]">{item.icon}</span>
                  {/* <span>{item.text}</span> */}
                </NavLink>
              </li>
            ))}
          </ul>
          {user ? (
            <button
              onFocus={() => setIsOpenOptions(true)}
              onBlur={() => setIsOpenOptions(false)}
              className="relative"
            >
              <div className="w-8 h-8 overflow-hidden rounded-full cursor-pointer">
                <img src={user?.avatar} loading="lazy" alt="" />
              </div>
              {isOpenOptions && <AuthOptions />}
            </button>
          ) : (
            <Button type="link" href="/signin">
              Signin
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
