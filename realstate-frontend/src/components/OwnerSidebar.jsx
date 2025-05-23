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

  const linkBase = "flex justify-center items-center w-full h-16 transition-colors duration-200";
  const activeClass = "bg-gray-900 text-white";
  const inactiveClass = "hover:bg-gray-700 text-white";

  return (
    <div
      className="bg-gray-800 text-white fixed top-0 left-0 min-h-screen shadow-lg flex flex-col items-center py-6 space-y-6 z-50"
      style={{ width: "15vw" }} // 15% viewport width
    >
      <div className="text-white text-3xl">
        🏠
      </div>
      <nav className="flex flex-col space-y-4 w-full px-2">
        <Link
          to="/owner/dashboard"
          title="Dashboard"
          className={`${linkBase} ${isActive("/owner/dashboard") ? activeClass : inactiveClass}`}
        >
          <LayoutDashboard size={28} />
        </Link>
        <Link
          to="/owner/addpropertyform"
          title="Add New Property"
          className={`${linkBase} ${isActive("/owner/addpropertyform") ? activeClass : inactiveClass}`}
        >
          <PlusSquare size={28} />
        </Link>
        <Link
          to="/owner/ownerpropertymanager"
          title="Manage Properties"
          className={`${linkBase} ${isActive("/owner/ownerpropertymanager") ? activeClass : inactiveClass}`}
        >
          <Building2 size={28} />
        </Link>
        <Link
          to="/owner/searchproperty"
          title="Search Properties"
          className={`${linkBase} ${isActive("/owner/searchproperty") ? activeClass : inactiveClass}`}
        >
          <Search size={28} />
        </Link>
        <Link
          to="/owner/ownerbookingmanager"
          title="Bookings"
          className={`${linkBase} ${isActive("/owner/ownerbookingmanager") ? activeClass : inactiveClass}`}
        >
          <CalendarCheck size={28} />
        </Link>
      </nav>
    </div>
  );
};

export default OwnerSidebar;
