import React from "react";
import Marquee from "react-fast-marquee";

const ChoosingSection = () => {
  return (
    <>
     
      <h2 className="text-4xl text-center text-black  font-bold mb-4 mt-5 animate__animated animate__fadeInDown">
        Why Choose Us
      </h2>
      <p className="text-center mb-5 animate__animated animate__fadeInUp ">
        To experience a user-friendly and easy-to-use platform for ticket booking
        online, Ticket Hub offers a seamless travel tickets booking
        experience for passengers. Take a look at the reasons why you should opt
        for Ticket Hub to book travel tickets online.
      </p>
      <Marquee pauseOnClick pauseOnHover speed={30}>
        <div className="card  w-96 h-80 shadow-sm mb-10 mr-5 bg-sky-200">
          <figure className="px-10 pt-10 ">
            <img
              src="https://i.ibb.co.com/WvkHBwkN/image.png"
              alt=""
              className="w-40 h-40 rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Connecting trains,buses,flights</h2>
            <p>
              Find, connecting travels with available seats
              .
            </p>
          </div>
        </div>

        <div className="card  w-96 h-80 shadow-sm mb-10 mr-5 bg-sky-200">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/4ZgZdXcc/image.png"
              alt=""
              className="w-40 h-40  rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Free Cancellation</h2>
            <p>
              Get full fare refund on cancelling your ticket with free
              Cancellation.
            </p>
          </div>
        </div>

        <div className="card  w-96 h-80 shadow-sm mb-10 mr-5 bg-sky-200">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/gFjNP1j3/image.png"
              alt=""
              className="w-40 h-40  rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Exclusive Deals and Discounts</h2>
            <p>Get exclusive discount while booking tickets.</p>
          </div>
        </div>

        <div className="card  w-96 h-80 shadow-sm mb-10 mr-5 bg-sky-200">
          <figure className="px-10 pt-10">
            <img
              src="https://i.ibb.co.com/JjH7Kw4G/image.png"
              alt=""
              className="w-40 h-40  rounded-full"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title">Dedicated Customer Care </h2>
            <p>
              Get on the spot resolutions for all your queries and grievances.
            </p>
          </div>
        </div>
      </Marquee>
    </>
  );
};

export default ChoosingSection;
