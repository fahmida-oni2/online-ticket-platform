import React from "react";
import { FaTicketAlt, FaUserAlt, FaHome, FaChevronRight } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import { TbTransactionDollar } from "react-icons/tb";
import { LuTicketCheck, LuTicketPlus } from "react-icons/lu";
import { MdRateReview } from "react-icons/md";
import { SiGoogletagmanager } from "react-icons/si";
import { GrUserManager } from "react-icons/gr";
import { RiAdvertisementFill } from "react-icons/ri";
import useRole from "../../Hooks/useRole";

const DashboardLayout = () => {
  const { role } = useRole();

  const activeStyle = "bg-accent text-white shadow-lg shadow-accent/20 translate-x-2";
  const normalStyle = "text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300";

  return (
    <div className="drawer lg:drawer-open min-h-screen font-sans bg-base-200">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      
      {/* Content Area */}
      <div className="drawer-content flex flex-col">
     
        <nav className="navbar w-full bg-white border-b border-base-300 px-6 py-4 sticky top-0 z-50">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-4" className="btn btn-square btn-ghost text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-[10px] font-black text-primary uppercase tracking-[0.3em]">
              Management / <span className="text-accent">{role} portal</span>
            </h2>
          </div>
         
        </nav>

        {/* Page Container */}
        <main className="p-6 lg:p-10 max-w-7xl w-full mx-auto">
          <div className="mb-10 animate__animated animate__fadeIn">
             <h1 className="text-3xl lg:text-4xl font-black text-primary uppercase tracking-tighter">
              Welcome to Dashboard
            </h1>
            <div className="h-1 w-20 bg-accent mt-2 rounded-full"></div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-xl border border-base-300 p-6 lg:p-8 min-h-[70vh]">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Sidebar */}
      <div className="drawer-side z-[100]">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <div className="flex flex-col w-72 min-h-full bg-primary text-white">
          
          {/* Sidebar Header / Logo */}
          <div className="p-8">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="https://i.ibb.co.com/kVR64Gmr/image.png"
                className="w-10 h-10 rounded-full bg-white p-1 transition-transform group-hover:rotate-12"
                alt="Logo"
              />
              <span className="font-black text-xl tracking-tighter">TICKET HUB</span>
            </Link>
          </div>

          {/* Navigation Menu */}
          <ul className="menu px-4 py-0 space-y-2 grow font-black text-[11px] uppercase tracking-widest">
            
            <li className="menu-title text-white/40 text-[9px] mt-4 mb-2">Main Navigation</li>
            
            <li>
              <NavLink to="/dashboard/profile" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                <FaUserAlt size={16} /> My Profile
              </NavLink>
            </li>

            {/* Role: USER */}
            <li>
              <NavLink to="/dashboard/my-tickets" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                <FaTicketAlt size={16} /> Booked Tickets
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/trans-history" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                <TbTransactionDollar size={18} /> Transactions
              </NavLink>
            </li>

            {/* Role: VENDOR */}
            {role === "vendor" && (
              <>
                <li className="menu-title text-white/40 text-[9px] mt-8 mb-2">Vendor Hub</li>
                <li>
                  <NavLink to="/dashboard/add-tickets" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <LuTicketPlus size={18} /> Create Ticket
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/myAdded-tickets" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <FaTicketAlt size={16} /> My Inventory
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/requested-bookings" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <LuTicketCheck size={18} /> Booking Requests
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/revenue" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <MdRateReview size={18} /> Revenue Report
                  </NavLink>
                </li>
              </>
            )}

            {/* Role: ADMIN */}
            {role === "admin" && (
              <>
                <li className="menu-title text-white/40 text-[9px] mt-8 mb-2">Admin Control</li>
                <li>
                  <NavLink to="/dashboard/manage-tickets" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <SiGoogletagmanager size={16} /> Review Tickets
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <GrUserManager size={16} /> User Management
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/advertise-tickets" className={({isActive}) => isActive ? activeStyle : normalStyle}>
                    <RiAdvertisementFill size={16} /> Ad Promotions
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Sidebar Footer */}
          <div className="p-6 border-t border-white/10">
             <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-accent transition-colors text-[10px] font-black uppercase">
                <FaHome /> Back to Website
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;