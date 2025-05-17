import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Utility function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Tailwind classes for active/inactive links
  const baseClass = "block py-2.5 px-4 rounded transition duration-200";
  const activeClass = "bg-gray-900 font-semibold";
  const inactiveClass = "hover:bg-gray-700";

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Admin Dashboard</span>
      </div>
      <nav>
        <Link
          to="/admin/dashboard"
          className={`${baseClass} ${isActive("/admin/dashboard") ? activeClass : inactiveClass}`}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/manageuser"
          className={`${baseClass} ${isActive("/admin/manageuser") ? activeClass : inactiveClass}`}
        >
          Manage Users
        </Link>
        <Link
          to="/admin/manageproperty"
          className={`${baseClass} ${isActive("/admin/manageproperty") ? activeClass : inactiveClass}`}
        >
          Manage Properties
        </Link>
        <Link
          to="/admin/managefedback"
          className={`${baseClass} ${isActive("/admin/managefedback") ? activeClass : inactiveClass}`}
        >
          Manage Feedback
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;