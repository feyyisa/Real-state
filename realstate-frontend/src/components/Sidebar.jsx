import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  Mail
} from "lucide-react";

const AdminSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkBase = "flex justify-center items-center w-full h-16 transition-colors duration-200";
  const activeClass = "bg-green-900 text-white";
  const inactiveClass = "hover:bg-green-800 text-white";

  return (
    <div
      className="bg-green-700 text-white fixed top-0 left-0 min-h-screen shadow-lg flex flex-col items-center py-6 space-y-6 z-50"
      style={{ width: "12vw", minWidth: "180px" }} // 12% viewport width, minimum 180px
    >
      <div className="text-white text-3xl mb-6">
        🏡
      </div>
      <nav className="flex flex-col space-y-4 w-full px-2">
        <Link
          to="/admin/dashboard"
          title=""
          className={`${linkBase} ${isActive("/admin/dashboard") ? activeClass : inactiveClass}`}
        >
          <LayoutDashboard size={28} />
        </Link>
        <Link
          to="/admin/manageuser"
          title="Manage Users"
          className={`${linkBase} ${isActive("/admin/manageuser") ? activeClass : inactiveClass}`}
        >
          <Users size={28} />
        </Link>
        <Link
          to="/admin/manageproperty"
          title="Approve Property"
          className={`${linkBase} ${isActive("/admin/manageproperty") ? activeClass : inactiveClass}`}
        >
          <Building2 size={28} />
        </Link>
        <Link
          to="/admin/managefedback"
          title="Manage Contact"
          className={`${linkBase} ${isActive("/admin/managefedback") ? activeClass : inactiveClass}`}
        >
          <Mail size={28} /> 
        </Link>
        <Link
          to="/admin/announcements"
          title="AdminAnnouncements"
          className={`${linkBase} ${isActive("/admin/announcements") ? activeClass : inactiveClass}`}
        >
          <Mail size={28} /> 
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
