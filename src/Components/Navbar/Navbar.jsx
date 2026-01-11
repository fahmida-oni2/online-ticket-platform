import React, { use, useEffect, useState } from "react";
import { NavLink, Link } from "react-router";
import "./Navbar.css";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);
 
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "Ticket Hub");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = (checked) => {
    
    setTheme(checked ? "dark" : "Ticket Hub");
  };

  const handleLogOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Signed out successfully");
        setIsDropdownOpen(false);
      })
      .catch((error) => console.error(error));
  };

  const handleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const links = (
    <>
      <li>
        <NavLink to="/" className={({ isActive }) => 
          `m-2 font-medium ${isActive ? "text-primary underline decoration-accent decoration-2" : "text-base-content"}`
        }>
          Home
        </NavLink>
      </li>
      <li>
        <div className="flex items-center m-2 gap-2">
          <span className="text-xs font-bold text-secondary">DARK</span>
          <input
            onChange={(e) => handleTheme(e.target.checked)}
            type="checkbox"
            checked={theme === "dark"}
            className="toggle toggle-accent"
          />
        </div>
      </li>
      <li>
        <NavLink to="/tickets" className="m-2">All Tickets</NavLink>
      </li>
      <li>
        <NavLink to="/about" className="m-2">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="m-2">Contact</NavLink>
      </li>
      {user && (
        <li>
          <NavLink to="/dashboard" className="m-2 text-primary font-bold">Dashboard</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 border-b border-base-200 sticky top-0 z-50 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden text-primary">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex="0" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-2xl border border-base-200">
            {links}
          </ul>
        </div>
        
        <div className="flex items-center">
          <img
            src="https://i.ibb.co.com/kVR64Gmr/image.png"
            className="h-10 w-10 rounded-full border-2 border-primary"
            alt="Logo"
          />
          <Link to="/" className="text-2xl font-black tracking-tighter text-primary">
            TICKET<span className="text-accent">HUB</span>
          </Link>
        </div>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-semibold text-secondary">
          {links}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <div className="relative">
            <div className="flex items-center gap-3">
               <span className="hidden md:block text-sm font-bold text-primary">{user.displayName}</span>
               <div 
                className="avatar cursor-pointer" 
                onClick={handleDropdown}
               >
                 <div className="w-11 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                   <img src={user.photoURL} alt="User" />
                 </div>
               </div>
            </div>
            
            {isDropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 z-50 bg-base-100 rounded-xl shadow-2xl border border-base-200 p-3">
                <p className="text-xs font-bold text-secondary mb-3 px-2 uppercase tracking-widest">Account</p>
                <Link
                  to="/dashboard/profile"
                  className="btn btn-primary btn-sm w-full rounded-lg mb-2"
                  onClick={() => setIsDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <button
                  onClick={handleLogOut}
                  className="btn btn-outline btn-error btn-sm w-full rounded-lg"
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
              className="btn btn-primary rounded-full  shadow-lg shadow-primary/20"
            >
             Book Now
            </button>

            {isAuthDropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 z-50 bg-base-100 rounded-xl shadow-2xl border border-base-200 p-2">
                <Link
                  to="/auth/login"
                  className="btn btn-ghost btn-sm w-full justify-start text-primary"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="btn btn-ghost btn-sm w-full justify-start text-primary"
                  onClick={() => setIsAuthDropdownOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default Navbar;