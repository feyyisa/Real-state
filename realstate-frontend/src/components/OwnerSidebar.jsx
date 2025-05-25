import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  PlusSquare,
  Building2,
  Search,
  CalendarCheck
} from "lucide-react";

const OwnerSidebar = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkBase = "flex justify-center items-center w-full h-12 transition-colors duration-200";
  const activeClass = "bg-gray-900 text-white";
  const inactiveClass = "hover:bg-gray-700 text-white";

  return (
    <div
      className="bg-gray-800 text-white fixed top-0 left-0 min-h-screen shadow-lg flex flex-col items-center py-3 z-50"
      style={{ width: "15vw" }}
    >
      <div className="text-white text-xl mb-2">🏠</div>
      <nav className="flex flex-col w-full px-2">
        <Link
          to="/owner/dashboard"
          title="Dashboard"
          className={`${linkBase} ${isActive("/owner/dashboard") ? activeClass : inactiveClass} mb-1`}
        >
          <LayoutDashboard size={20} />
        </Link>
        <Link
          to="/owner/addpropertyform"
          title="Add New Property"
          className={`${linkBase} ${isActive("/owner/addpropertyform") ? activeClass : inactiveClass} mb-1`}
        >
          <PlusSquare size={20} />
        </Link>
        <Link
          to="/owner/ownerpropertymanager"
          title="Manage Properties"
          className={`${linkBase} ${isActive("/owner/ownerpropertymanager") ? activeClass : inactiveClass} mb-1`}
        >
          <Building2 size={20} />
        </Link>
        <Link
          to="/owner/ownerbookingmanager"
          title="Bookings"
          className={`${linkBase} ${isActive("/owner/ownerbookingmanager") ? activeClass : inactiveClass} mb-1`}
        >
          <CalendarCheck size={20} />
        </Link>
        <Link
          to="/owner/feedbacklist"
          title="Feedback List"
          className={`${linkBase} ${isActive("/owner/feedbacklist") ? activeClass : inactiveClass}`}
        >
          <CalendarCheck size={20} />
        </Link>
      </nav>
    </div>
  );
};

export default OwnerSidebar;
