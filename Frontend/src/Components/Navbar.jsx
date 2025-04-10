import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth data (like token/session)
    localStorage.removeItem("token");

    // Optional: Clear other session data
    // sessionStorage.clear();

    // Redirect to the logged out screen
    navigate("/logged-out");
  };


  return (
    <nav className="bg-gray-100 shadow-md">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}
        <Link href="/home-page">
          <img
            src="https://www.autointelli.com/assets/img/hero-logo.webp"
            alt="Logo"
            className="h-12 w-auto"
          />
        </Link>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-gray-700 rounded-lg md:hidden hover:bg-gray-200 focus:outline-none"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* User Profile */}
        <div className="relative md:order-2" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center text-sm bg-gray-800 hover:bg-gray-700 text-white rounded-full p-1 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-400"
          >
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user"
            />
          </button>

          {/* Dropdown */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <ul className="py-2 text-sm text-gray-700">
                <li>
                  <a href="#" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </a>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 font-medium mt-4 md:mt-0 border border-gray-700 rounded-lg md:border-0 p-4 md:p-0 bg-gray-700 md:bg-transparent">
            {[
              "Active Sessions",
              "History",
              "Users",
              "Groups",
              "Connections",
            ].map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block py-2 px-3 text-white md:text-black hover:text-green-500 hover:underline hover:underline-offset-4 decoration-2 transition duration-200"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
