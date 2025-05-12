import React from "react";
import { Link } from "react-router-dom";
import AddPropertyForm from './../pages/owner/AddPropertyForm';

const OwnerSidebar = () => {
  return (
    <div className="bg-gray-800 text-white w-64 space-y-6 py-9 px-3">
      <div className="text-white flex items-center space-x-2 px-4">
        <span className="text-2xl font-extrabold">Owner Dashboard</span>
      </div>
      <nav>
        <Link
          to="addpropertyform"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
        AddPropertyForm
        </Link>
        <Link
          to="searchproperty"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
          SearchProperty
        </Link>
        <Link
   
          to="OwnerPropertyManager"
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
        >
         OwnerPropertyManager
        </Link>
        <Link to="ownerbookingmanager"
   className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
 >
  OwnerBookingManager
 </Link>
 <Link to="ownerpayments"
   className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700"
 >
  ownerpayments
  
 </Link>
      </nav>
    </div>
  );
};
export default OwnerSidebar;
