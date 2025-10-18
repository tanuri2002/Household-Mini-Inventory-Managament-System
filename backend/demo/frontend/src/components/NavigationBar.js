// NavigationBar.js
import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RiAccountCircleLine } from "react-icons/ri";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  const { isLoggedIn, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown on route change
  useEffect(() => {
    setDropdownOpen(false);
  }, [location]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-teal-600 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <NavLink to="/">Home Stock</NavLink>
          </div>

          {/* Hamburger for mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg className="h-8 w-8 fill-current" viewBox="0 0 24 24">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.3 5.71a1 1 0 0 0-1.41-1.42L12 9.17 7.11 4.29A1 1 0 0 0 5.7 5.7L10.59 10.6 5.7 15.5a1 1 0 1 0 1.41 1.42L12 12.83l4.89 4.89a1 1 0 0 0 1.41-1.42L13.41 10.6l4.89-4.89z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16v2H4V5zm0 6h16v2H4v-2zm0 6h16v2H4v-2z"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Menu items */}
          <div
            className={`sm:flex sm:items-center ${isOpen ? "block" : "hidden"} space-x-2 font-semibold`}
          >
            <NavLink
              to="/homePg"
              className={({ isActive }) =>
                (isActive ? "underline " : "") +
                "block px-3 py-2 rounded hover:bg-teal-500"
              }
            >
              Home
            </NavLink>
            {/* <NavLink
              to="/about"
              className={({ isActive }) =>
                (isActive ? "underline" : "") +
                "block px-3 py-2 rounded hover:bg-teal-500"
              }
            >
              About
            </NavLink> */}

            {/* Dashboard only visible after login */}
            {isLoggedIn && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  (isActive ? "underline " : "") +
                  "block px-3 py-2 rounded hover:bg-teal-500"
                }
              >
                Dashboard
              </NavLink>
            )}

            {/* Auth-based links */}
            {!isLoggedIn ? (
              <>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    (isActive ? "underline " : "") +
                    "block px-3 py-2 rounded hover:bg-teal-500"
                  }
                >
                  Sign Up
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    (isActive ? "underline " : "") +
                    "block px-3 py-2 rounded hover:bg-teal-500"
                  }
                >
                  Login
                </NavLink>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="px-3 py-2 rounded hover:bg-gray-500 flex items-center space-x-2"
                >
                  <RiAccountCircleLine size={24} />
                  <span>{username || ""}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md">   
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
