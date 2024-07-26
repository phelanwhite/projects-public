import { adminSidebarLinks } from "@/assets/constant";
import { Link } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="fixed top-0 left-0 bottom-0 max-w-[300px] w-full max-h-screen overflow-y-auto shadow">
      {adminSidebarLinks.map((link) => (
        <Link key={link.to} to={link.to}>
          <div
            className={[
              `py-2 px-4 flex items-center gap-3 text-black rounded-lg hover:bg-blue-100`,
              window.location.pathname.includes(link.to) &&
                "bg-blue-100 text-blue-500",
            ].join(" ")}
          >
            <span>{link.icon}</span>
            <span className="font-medium">{link.title}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default AdminSidebar;
