import React, { useContext, useState } from "react";
import "./Navbar.css";
import { AuthContext } from "../Contexts/authContexts/context";

const Navbar = () => {
  const { setUserLoggedin } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const { userLoggedIn } = useContext(AuthContext);
  return (
    <nav className="bg-transparent border-gray-900  ">
      <div className="absolute inset-x-0 top-0 z-50 max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-semibold whitespace-nowrap ">
            findployee
          </span>
        </a>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {userLoggedIn ? (
            <button
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 "
              onClick={toggleDropdown}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyuV7-Bcw9pe-ZjEzEyjUbR05jnouC2GOjjQ&s"
                alt="user photo"
              />
            </button>
          ) : (
            <a href="/login">Login</a>
          )}
          {dropdownOpen && (
            <div className="dropdown-menu" id="user-dropdown">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900 ">
                  John Doe
                </span>
                <span className="block text-sm  text-gray-500 truncate ">
                  johndoe@yahoo.com
                </span>
              </div>
              <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    onClick={() => {
                      setUserLoggedin(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
                  >
                    <button className="buttons">Logout</button>
                  </a>
                </li>
              </ul>
            </div>
          )}
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white ">
            <li>
              <a
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 "
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                href="/createTeam"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Create Team
              </a>
            </li>
            <li>
              <a
                href="/EditEmp"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 "
              >
                Teams
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
