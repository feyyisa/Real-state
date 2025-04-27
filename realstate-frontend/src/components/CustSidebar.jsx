import React from "react";
import { Link } from "react-router-dom";

const CustSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-xl font-extrabold">Customer Dashboard</span>
      </div>
      <nav>
        <Link
          to="reciveagreement"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
        ReciveAgreement
        </Link>
        <Link
          to="searchproperty"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          SearchProperty
        </Link>
      </nav>
    </div>
  );
};

export default CustSidebar;
