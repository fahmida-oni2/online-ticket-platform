import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaPhone } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="  bg-sky-950 text-white flex justify-center items-center md:flex-col ml-5 mr-5  p-5  ">
      <div className=" ">
        <div className="flex flex-col lg:flex-row lg:gap-40   justify-center   ">
        <aside className="lg:mr-5 ">
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co.com/kVR64Gmr/image.png"
              alt=""
              className="h-20 w-20 rounded-full"
            />
          </div>

          <div className="text-center">
            <p>
              RailTransit Hub
              <br />
              Book your train tickets easily
            </p>
          </div>
        </aside>
        <div className="flex gap-10 flex-col lg:flex-row lg:gap-70 ">
          <nav className="flex flex-col items-center mt-10 lg:mt-0 ">
            <h6 className="footer-title">Quick Links</h6>
            <Link to='/'>Home</Link>
            <Link to='/tickets'>All Tickets</Link>
            <Link to='/contact'>Contact Us</Link>
            <Link to='/about'> About</Link>
          </nav>
        <nav className="flex flex-col items-center space-y-3">
    <h6 className="footer-title ">Contact Info</h6>
    
    <a href="mailto:railtransit@gmail.com" >
        <MdMarkEmailRead className="w-30 h-7" />
    </a>
    
    <a href="tel:+8801745203494">
        <FaPhone className="w-30 h-7" />
    </a>
    
    <a href="#" > 
        <CiFacebook className="w-30 h-7" />
    </a>
</nav>
          <nav className="flex flex-col items-center">
            <h6 className="footer-title">Payment Methods</h6>

          </nav>
        </div>
      </div>
      <div className="flex justify-center items-center mt-10">
      <p > © {new Date().getFullYear()}  RailTransit Hub: All right reserved</p>
      </div>
      </div>

    </footer>
  );
};

export default Footer;
