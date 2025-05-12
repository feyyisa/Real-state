import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchUser = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
    window.addEventListener("storage", fetchUser);
    return () => window.removeEventListener("storage", fetchUser);
  }, []);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <img
        onClick={toggleDropdown}
        className="w-10 h-10 rounded-full border-2 cursor-pointer"
        src={user?.avatar || "/images/default-avatar.png"}
        alt="User avatar"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/default-avatar.png";
        }}
      />

      {isOpen && (
        <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:bg-gray-700">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>{user.username || "Guest"}</div>
            <div className="font-medium truncate">{user.email || "No Email"}</div>
          </div>
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <Link
                to="/UserProfileUpdate"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/mymessage"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                My Messages
              </Link>
            </li>
            <li>
              <Link
                to="/bookingSummary"
                className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                Booking Summary
              </Link>
            </li>
          </ul>
          <div className="border-t border-gray-100 dark:border-gray-600">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200"
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
