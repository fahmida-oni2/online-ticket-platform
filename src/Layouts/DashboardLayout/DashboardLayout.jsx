import React from "react";
import { FaTicketAlt, FaUserAlt } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import { TbTransactionDollar } from "react-icons/tb";
import { LuTicketCheck, LuTicketPlus } from "react-icons/lu";
import { MdRateReview } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import { RiAdvertisementFill } from "react-icons/ri";
import Footer from "../../Components/Footer/Footer";

const DashboardLayout = () => {
  return (
    <>
      <div className="drawer lg:drawer-open min-h-screen">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Navbar */}
          <nav className="navbar w-full bg-base-300">
            <label
              htmlFor="my-drawer-4"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              {/* Sidebar toggle icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
                className="my-1.5 inline-block size-4  "
              >
                <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 4v16"></path>
                <path d="M14 10l2 2l-2 2"></path>
              </svg>
            </label>
          </nav>
          {/* Page content here */}

          <div className="ml-5 mr-5">
            <Outlet></Outlet>
          </div>
        </div>

        <div className="drawer-side is-drawer-close:overflow-visible">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
            {/* Sidebar content here */}
            <ul className="menu w-full grow">
              {/* List item */}
              <li>
                <Link
                  to="/"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="Homepage"
                >
                  {/* Home icon */}
                  <img
                    src="https://i.ibb.co.com/kVR64Gmr/image.png"
                    className="h-10 w-10 rounded-full "
                    alt=""
                  />
                  <span className="is-drawer-close:hidden">Homepage</span>
                </Link>
              </li>

              <li>
                <NavLink
                  to="/dashboard/profile"
                  className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                  data-tip="My Profile"
                >
                  <FaUserAlt />
                  <span className="is-drawer-close:hidden">My Profile</span>
                </NavLink>
              </li>
              {/* User */}
              <li>
                <NavLink to="/dashboard/my-tickets" className="">
                  <FaTicketAlt />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    My Booked Tickets
                  </span>
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/trans-history">
                  <TbTransactionDollar />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Transaction History
                  </span>
                </NavLink>
              </li>

              {/* vendor */}
              <li>
                <NavLink to="/dashboard/add-tickets" className="">
                  <LuTicketPlus />
                  <span className="is-drawer-close:hidden"> Add Tickets</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myAdded-tickets" className="">
                  <LuTicketPlus />
                  <span className="is-drawer-close:hidden">
                    My Added Tickets
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/requested-bookings" className="">
                  <LuTicketCheck />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Requested Bookings{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/revenue" className="">
                  <MdRateReview />
                  <span className="is-drawer-close:hidden">
                    Revenue Overview
                  </span>
                </NavLink>
              </li>
              {/* Admin */}
              <li>
                <NavLink to="/dashboard/manage-tickets" className="">
                  <SiGoogletagmanager />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Manage Tickets{" "}
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manage-users" className="">
                  <GrUserManager />
                  <span className="is-drawer-close:hidden"> Manage Users </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/advertise-tickets" className="">
                  <RiAdvertisementFill />
                  <span className="is-drawer-close:hidden">
                    {" "}
                    Advertise Tickets{" "}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default DashboardLayout;
