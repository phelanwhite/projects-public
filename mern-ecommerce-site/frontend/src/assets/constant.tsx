import {
  MdDashboard,
  MdFavorite,
  MdOutlinePreview,
  MdSearch,
} from "react-icons/md";
import {
  IoIosNotifications,
  IoMdBookmarks,
  IoMdCart,
  IoMdListBox,
} from "react-icons/io";
import { FaAddressCard, FaUserCog } from "react-icons/fa";

export const adminSidebarLinks = [
  {
    title: "Dashboard",
    to: "/admin/dashboard",
    icon: <MdDashboard />,
  },
  {
    title: "Orders",
    to: "/admin/orders",
    icon: <MdDashboard />,
  },
  {
    title: "Products",
    to: "/admin/products",
    icon: <MdDashboard />,
  },
  {
    title: "Brands",
    to: "/admin/brands",
    icon: <MdDashboard />,
  },
  {
    title: "Categories",
    to: "/admin/categories",
    icon: <MdDashboard />,
  },
];

export const headerLinks = [
  {
    title: "Dashboard",
    to: "/search",
    icon: <MdSearch />,
  },
  {
    title: "Cart",
    to: "/cart",
    icon: <IoMdCart />,
  },
];

export const userLinks = [
  {
    title: "Account Information",
    to: "/account/account-information",
    icon: <FaUserCog />,
  },
  {
    title: "My Notice",
    to: "/account/my-notice",
    icon: <IoIosNotifications />,
  },
  {
    title: "Order Management",
    to: "/account/order-management",
    icon: <IoMdListBox />,
  },
  {
    title: "Address",
    to: "/account/address",
    icon: <FaAddressCard />,
  },
  {
    title: "Product Reviews",
    to: "/account/product-reviews",
    icon: <MdOutlinePreview />,
  },
  {
    title: "Favorite Product",
    to: "/account/favorite-product",
    icon: <MdFavorite />,
  },
  {
    title: "Wishlist Product",
    to: "/account/wishlist",
    icon: <IoMdBookmarks />,
  },
];

export const categories = [
  {
    title: "Laptop",
    value: "laptop",
    image:
      "https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp",
  },
  {
    title: "Laptop",
    value: "laptop",
    image:
      "https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp",
  },
  {
    title: "Laptop",
    value: "laptop",
    image:
      "https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp",
  },
  {
    title: "Laptop",
    value: "laptop",
    image:
      "https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp",
  },
  {
    title: "Laptop",
    value: "laptop",
    image:
      "https://salt.tikicdn.com/cache/100x100/ts/category/ed/20/60/afa9b3b474bf7ad70f10dd6443211d5f.png.webp",
  },
];
