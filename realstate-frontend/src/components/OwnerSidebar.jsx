import React from "react";
import { Link, useLocation } from "react-router-dom";

const OwnerSidebar = () => {
  const location = useLocation();

  const links = [
    { path: "/owner/dashboard", label: "Dashboard" },
    { path: "/owner/addpropertyform", label: "Add New Property" },
    { path: "/owner/ownerpropertymanager", label: "Manage Properties" },
    { path: "/owner/searchproperty", label: "Search Properties" },
    { path: "/owner/ownerbookingmanager", label: "Bookings" },
    
  ];

  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-9 px-3">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Owner Dashboard</span>
      </div>
      <nav className="space-y-1">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`block py-2.5 px-4 rounded transition duration-200 ${
              location.pathname === link.path
                ? "bg-gray-700 font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default OwnerSidebar;