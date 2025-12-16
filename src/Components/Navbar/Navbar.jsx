import React, { use, useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light");
  };

  const handleLogOut = () => {
    signOutUser()
      .then(() => toast.success("SignOut successfully"))
      .catch((error) => console.error(error));
  };

  const handleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const links = (
    <>
      <li>
        <NavLink to="/" className="m-2">
          Home
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/tickets" className="m-2">
              All Tickets
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" className="m-2">
              Dashboard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between gap-15">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img
          src="https://i.ibb.co.com/kVR64Gmr/image.png"
          className="h-12 w-12 rounded-full lg:ml-5"
          alt="Logo"
        />
        <Link to="/" className="text-xl lg:ml-2 font-extrabold text-sky-800">
          Ticket Hub
        </Link>
      </div>

      <div className="flex justify-center items-center">
        <input
          onChange={(e) => handleTheme(e.target.checked)}
          type="checkbox"
          checked={theme === "dark"}
          className="toggle"
        />
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="login-btn sm:flex-row flex mr-5 justify-center items-center">
        {user ? (
          <div className="relative">
            <img
              onClick={handleDropdown}
              src={user.photoURL}
              title={user.displayName}
              className="h-12 w-12 rounded-full hover:scale-105 transition cursor-pointer lg:ml-5"
              alt="User"
            />
            {isDropdownOpen && (
              <div className="absolute right-0 mt-1 w-48 z-10 bg-white rounded-md shadow-lg border border-gray-200 p-2">
                <Link
                  to="/dashboard/profile"
                  className="btn w-full rounded-2xl mb-2"
                >
                  My profile
                </Link>
                <button
                  onClick={handleLogOut}
                  className="btn btn-primary bg-sky-800 w-full rounded-2xl"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative">
            <button
              onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              className="btn btn-primary bg-sky-800 rounded-2xl"
            >
              Login/Register
            </button>

            {isAuthDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 z-50 bg-base-100 rounded-md shadow-xl border border-gray-200 p-2">
                <Link
                  to="/auth/login"
                  className="btn btn-ghost btn-sm w-full justify-start mb-1"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-ghost btn-sm w-full justify-start"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
};

export default Navbar;
