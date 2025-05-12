import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Admin Dashboard</span>
      </div>
      <nav>
        <Link
          to="ownermanage"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Manage Owners
        </Link>
        <Link
          to="manageuser"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Manage Users
        </Link>
        <Link
          to="manageproperty"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Manage Properties
        </Link>
        <Link
          to="managefedback"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          Manage Feedback  
        </Link>
        <Link
          to="analythicsdashboard"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          analythicsdashboard
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
