import { Home } from "lucide-react";
import { MdGroup, MdHome, MdSave } from "react-icons/md";

export const menuLink = [
  {
    title: "My Posts",
    href: "/my-posts",
    icon: <Home />,
  },
  {
    title: "Activity",
    href: "/activity",
    icon: <Home />,
  },
  {
    title: "Saved",
    href: "/saved",
    icon: <MdSave />,
  },
  {
    title: "Marketplace",
    href: "/marketplace",
    icon: <Home />,
  },
];
export const menuHeader = [
  {
    title: "Home",
    href: "/",
    icon: <MdHome />,
  },
  {
    title: "Friend",
    href: "/friend",
    icon: <MdGroup />,
  },
];
