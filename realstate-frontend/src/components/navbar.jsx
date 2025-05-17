import React from "react";
import { Link } from "react-router-dom";
import UserDropdown from "./UserProfile";
import Login from './../pages/commonshare/Login';
import FAQPage from './FAQPage';
import Home from './../pages/costumer/Home';

export default function Navbar() {
  // Get the role from localStorage (assuming you store user info as a JSON string)
  const user = JSON.parse(localStorage.getItem("user")); 
  const role = user?.role;

  return (
    <div className="bg-green-400 ">
      <h1 className="text-2xl font-bold text-gray-700 text-center">Real Estate</h1>
      {/* Flex container to position the navbar items */}
      <ul className="flex justify-end space-x-6 text-white font-semibold mt-2">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/service">Service</Link>
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Show UserDropdown only if role is 'customer' */}
        {role === "customer" && <UserDropdown />}
      </ul>
    </div>
  );
}
