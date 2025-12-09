import React, { use } from "react";
import { Links, NavLink } from "react-router";
import "./Navbar.css";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const handleLogOut = () => {
    signOutUser()
      .then((result) => {
        // console.log(result.user)
        toast.success("SignOut successfully");
      })
      .catch((error) => {
        //  console.log(error)
      });
    // console.log("user trying to logout")
  };

  const links = (
    <>
      <li>
        <NavLink to="/" className="m-2">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/tickets" className="m-2">
          All Tickets
        </NavLink>
      </li>

      
      

      {user && (
        <li>
          <NavLink to="/dashboard" className="m-2">
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm flex justify-between gap-20">
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
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100  rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <img src='https://i.ibb.co.com/kVR64Gmr/image.png' className="h-12 w-12  ml-5" alt="" />
        <Link to="/" className=" text-xl  mr-3 lg:mr-0  font-extrabold text-sky-800">
          RailTransit Hub
        </Link>
      </div>
      <div className="navbar-center hidden  lg:flex ">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="login-btn   sm:flex-row flex  justify-center items-center ">
       
        {user ? (
          <>
           <img
          src={`${ user.photoURL}`}
          title={`${user.displayName}` }
          className="h-12 w-12  rounded-full hover:scale-105 transition ease-in-out mr-2  lg:mt-0 lg:mr-5"
          alt=""
        />
          <button
            onClick={handleLogOut}
            className="btn bg-sky-800 text-white rounded-2xl m-2 mr-5 grid md:flex lg:flex hover:bg-indigo-300"
          >
            LogOut
          </button>
          </>
          
        ) : (
          <div className="navbar-end grid md:flex lg:flex">
            <div className="navbar-end flex  lg:flex-row  lg:mt-0 ml-20 gap-2 ">
              <Link
                to="/auth/login"
                className="btn bg-sky-800 rounded-2xl text-white hover:bg-indigo-300"
              >
                Login
              </Link>
             
            </div>
          </div>
        )}
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default Navbar;
