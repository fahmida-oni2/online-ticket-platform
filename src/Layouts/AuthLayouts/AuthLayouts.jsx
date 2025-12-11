import React from "react";

import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const AuthLayouts = () => {
  return (
    <div>
      <main>
        <header className="sticky top-0 z-50 ">
          <Navbar></Navbar>
        </header>

        <Outlet></Outlet>
        <Footer></Footer>
      </main>
    </div>
  );
};

export default AuthLayouts;
