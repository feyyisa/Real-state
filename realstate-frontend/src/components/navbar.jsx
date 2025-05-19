import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UserDropdown from "./UserProfile";

export default function Navbar() {
  const { t } = useTranslation();

  // Get the role from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  return (
    <div className="bg-green-400">
      <h1 className="text-2xl font-bold text-gray-700 text-center">Real Estate</h1>

      {/* Navbar Items */}
      <ul className="flex justify-end space-x-6 text-white font-semibold mt-2">
        <li>
          <Link to="/">{t("navbar.home")}</Link>
        </li>
        <li>
          <Link to="/about">{t("navbar.about")}</Link>
        </li>
        <li>
          <Link to="/service">{t("navbar.service")}</Link>
        </li>
        <li>
          <Link to="/pricing">{t("navbar.pricing")}</Link>
        </li>
        <li>
          <Link to="/contact">{t("navbar.contact")}</Link>
        </li>
        <li>
          <Link to="/faq">{t("navbar.faq")}</Link>
        </li>
        <li>
          <Link to="/login">{t("navbar.login")}</Link>
        </li>
        <li>
          <Link to="/register">{t("navbar.register")}</Link>
        </li>
        {role === "customer" && <UserDropdown />}
      </ul>
    </div>
  );
}
