import React from "react";
import { CiFacebook } from "react-icons/ci";
import { FaPhone, FaGlobe } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-content pt-16 pb-8 px-5 border-t border-white/10">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Brand Column */}
          <aside className="flex flex-col items-center md:items-start space-y-4">
            <div className="bg-white p-1 rounded-full shadow-lg">
              <img
                src="https://i.ibb.co.com/kVR64Gmr/image.png"
                alt="Ticket Hub Logo"
                className="h-16 w-16 rounded-full"
              />
            </div>
            <div>
              <h2 className="text-2xl font-black tracking-tighter">TICKET HUB</h2>
              <p className="text-sm opacity-80 mt-2 font-medium">
                Your premier gateway to effortless travel booking across road, rail, and air.
              </p>
            </div>
          </aside>

          {/* Quick Links Column */}
          <nav className="flex flex-col space-y-3">
            <h6 className="text-accent font-black uppercase tracking-widest text-sm mb-2">Quick Links</h6>
            <Link to="/" className="hover:text-accent transition-colors duration-300">Home</Link>
            <Link to="/tickets" className="hover:text-accent transition-colors duration-300">All Tickets</Link>
            <Link to="/contact" className="hover:text-accent transition-colors duration-300">Contact Us</Link>
            <Link to="/about" className="hover:text-accent transition-colors duration-300">About Our Hub</Link>
          </nav>

          {/* Contact Info Column */}
          <nav className="flex flex-col items-center md:items-start space-y-4">
            <h6 className="text-accent font-black uppercase tracking-widest text-sm mb-2">Contact Info</h6>
            
            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-accent transition-colors">
                <MdMarkEmailRead className="w-5 h-5 text-accent group-hover:text-primary" />
              </div>
              <span className="text-sm">tickethub@gmail.com</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-accent transition-colors">
                <FaPhone className="w-5 h-5 text-accent group-hover:text-primary" />
              </div>
              <span className="text-sm">+880 1745 203494</span>
            </div>

            <div className="flex items-center gap-3 group">
              <div className="p-2 bg-white/10 rounded-lg group-hover:bg-accent transition-colors">
                <FaGlobe className="w-5 h-5 text-accent group-hover:text-primary" />
              </div>
              <span className="text-sm">www.tickethub.com</span>
            </div>
          </nav>

          {/* Payment Methods Column */}
          <div className="flex flex-col items-center md:items-start">
            <h6 className="text-accent font-black uppercase tracking-widest text-sm mb-4">Secure Payment</h6>
            <div className="flex gap-4">
              <a href="https://stripe.com/" className="hover:scale-110 transition-transform">
                <img src="https://i.ibb.co.com/wh7yrvZf/image.png" alt="Stripe" className="h-10 w-10 rounded-xl bg-white p-1" />
              </a>
              <a href="https://stripe.com/" className="hover:scale-110 transition-transform">
                <img src="https://i.ibb.co.com/FQxbYCL/image.png" alt="Card Payment" className="h-10 w-10 rounded-xl bg-white p-1" />
              </a>
            </div>
            <p className="text-[10px] opacity-50 mt-4 uppercase tracking-tighter">
              Encrypted & Secured by SSL
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 text-center">
          <p className="text-xs opacity-60 font-medium">
            © {new Date().getFullYear()} <span className="text-accent font-bold">Ticket Hub</span>. 
            All rights reserved. Designed for professional travel management.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;