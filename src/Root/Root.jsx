import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Loading from "../Components/Loading/Loading";
import { Outlet, useNavigation } from "react-router";
import Footer from "../Components/Footer/Footer";

const Root = () => {
  const { state } = useNavigation();
  return (
    <div className="flex flex-col  bg-gray-100 min-h-screen">
      <header className="sticky top-0 z-50 ">
        <Navbar></Navbar>
      </header>
      <section className="min-h-screen ml-5 mr-5 ">
        {state == "loading" ? <Loading></Loading> : <Outlet></Outlet>}
      </section>
      <Footer></Footer>
    </div>
  );
};

export default Root;
