import React from "react";
const Footer = () => {
  return (
    <footer className=" max-w-8xl text-center  mx-auto ml-5 mr-5 bg-black text-primary-content p-10">
      <aside>
        <div>
          <div className="flex justify-center">
            <img src='https://i.ibb.co.com/kVR64Gmr/image.png' alt="" className="h-20 w-20 rounded-full" />
          </div>
          <p className="font-bold mb-5">
            RailTransit Hub
            <br />
            Providing reliable service since 1992
          </p>
        </div>
        <p >
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
    </footer>
  );
};

export default Footer;
