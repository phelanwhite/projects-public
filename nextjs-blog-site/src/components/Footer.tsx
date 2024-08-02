import Link from "next/link";
import React from "react";

const footerLinks = {
  list1: {
    title: "Quick Link",
    list: [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
      { name: "Posts", path: "/posts" },
      { name: "Archived", path: "/archived" },
      { name: "Author", path: "/author" },
      { name: "Contact", path: "/contact" },
    ],
  },
  list2: {
    title: "Category",
    list: [
      { name: "Lifestyle", path: "/lifestyle" },
      { name: "Technology", path: "/technology" },
      { name: "Travel", path: "/travel" },
      { name: "Business", path: "/business" },
      { name: "Economy", path: "/cconomy" },
      { name: "Sports", path: "/sports" },
    ],
  },
  list3: {
    title: "Contact",
    list: [
      {
        name: "Email",
        path: "mailto:info@jstemplate.net",
        value: "info@jstemplate.net",
      },
      { name: "Phone", path: "tel:1234567890", value: "1234567890" },
    ],
  },
  list4: {
    list: [
      { name: "Terms of Use", path: "/terms-of-use" },
      { name: "Privacy Policy", path: "/privacy-policy" },
      { name: "Terms of Service", path: "/terms-of-service" },
    ],
  },
};

const Footer = () => {
  return (
    <div className="bg-bgFooter">
      <div className="py-16 max-w-[1216px] w-full mx-auto grid gap-20 grid-cols-4">
        <ul>
          <li className="font-semibold text-[18px] mb-6">About</li>
          <li className="text-textColor2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam
          </li>
        </ul>
        <ul>
          <li className="font-semibold text-[18px] mb-6">
            {footerLinks.list1.title}
          </li>
          <li>
            <ul>
              {footerLinks.list1.list.map((item) => (
                <li key={item.name} className="text-textColor2">
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <ul>
          <li className="font-semibold text-[18px] mb-6">
            {footerLinks.list2.title}
          </li>
          <li>
            <ul>
              {footerLinks.list2.list.map((item) => (
                <li key={item.name} className="text-textColor2">
                  <Link href={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </li>
        </ul>
        <ul>
          <li className="font-semibold text-[18px] mb-6">
            {footerLinks.list3.title}
          </li>
          <li>
            <ul>
              {footerLinks.list3.list.map((item) => (
                <li key={item.name} className="text-textColor2">
                  <a href={item.path}>
                    <span>{item.name}: </span> <span>{item.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
      <div className="border-[#DCDDDF] border-t py-16 max-w-[1216px] w-full mx-auto flex gap-4 justify-end">
        {footerLinks.list4.list.map((item) => (
          <Link key={item.path} className="text-textColor2" href={item.path}>
            {item.name}
          </Link>
        ))}
        <ul className="flex "></ul>
      </div>
    </div>
  );
};

export default Footer;
