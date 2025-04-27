import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="bg-green-400 p-2">
      <h1 className="text-2xl font-bold text-gray-700 text-center">Real Estate</h1>
      <ul className="flex justify-around text-white font-semibold mt-2">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/service">Service</Link> {/* Ensure path matches */}
        </li>
        <li>
          <Link to="/pricing">Pricing</Link>
        </li>
       
        <li>
          <Link to="/contact">Contact</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>
       
      </ul>
    </div>
  );
}