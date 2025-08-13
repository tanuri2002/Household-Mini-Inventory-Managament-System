import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-teal-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div className="text-2xl font-bold">
            <NavLink to="/" className="hover:text-yellow-300">
              Home Stock
            </NavLink>
          </div>

          {/* Hamburger for mobile */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-8 w-8 fill-current"
                viewBox="0 0 24 24"
              >
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
          <div className={`sm:flex sm:items-center ${isOpen ? "block" : "hidden"}`}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                (isActive ? "underline " : "") +
                "block px-3 py-2 rounded hover:bg-gray-500"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                (isActive ? "underline " : "") +
                "block px-3 py-2 rounded hover:bg-gray-500"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                (isActive ? "underline " : "") +
                "block px-3 py-2 rounded hover:bg-gray-500"
              }
            >
              Sign Up
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                (isActive ? "underline " : "") +
                "block px-3 py-2 rounded hover:bg-gray-500"
              }
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
