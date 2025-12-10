import React from 'react';

const About = () => {
    return (
       <div className="flex flex-col min-h-screen mb-5 ">
      <h2 className="text-4xl mt-10 text-center text-sky-800  font-bold mb-4 animate__animated animate__fadeInDown">
        About Us
      </h2>
      <p className=" mb-12 italic text-center animate__animated animate__fadeInUp max-w-3xl mx-auto">
        RailTransitHub: Train Travel All In One Place <br />
RailTransitHub is the premier platform designed to offer a modern, efficient, and comprehensive rail travel experience, centralizing all your train ticketing and journey management needs.
      </p>
      <div className="flex mb-5 justify-center items-center">
     <img src="https://i.ibb.co.com/gbpjgPyY/image.png" alt="" className="h-100 w-150" />
      </div>
 
      {/* what we offer */}
      <div className=" flex-col lg:flex-row items-center bg-gray-50  rounded-xl   animate__animated animate__fadeInRight">
        <div className="space-y-3">
          <h1 className="text-4xl text-sky-800 mt-5 text-center font-bold mb-4 animate__animated animate__fadeInDown">
            What We Offer
          </h1>
          <h3 className="text-gray-600 mb-12 text-center animate__animated animate__fadeInUp max-w-3xl mx-auto">
            RailTransitHub transforms the frustrating uncertainty of waitlisted tickets and plan changes into a guaranteed, flexible, and stress-free booking experience.
          </h3>
        </div>
        <div className="space-y-3 mt-3 lg:flex  lg:justify-evenly">
          <div className="max-w-6xl mx-auto text-center ">
            <div className="grid md:grid-cols-3 lg:flex gap-10">
              <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInLeft">
                <h3 className="text-xl font-semibold mb-2 text-sky-800">
                  Comprehensive Booking
                </h3>
                <p className="text-gray-500 text-center">
                 Easily search, compare, and book tickets across multiple rail operators and routes, all in one platform.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInUp">
                <h3 className="text-xl font-semibold mb-2 text-sky-800">
                  Real-Time Schedules
                </h3>
                <p className="text-gray-500 text-center">
                 Access up-to-the-minute train timetables, departure, and arrival information.
                </p>
              </div>
        
              <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInRight">
                <h3 className="text-xl font-semibold mb-2 text-sky-800">
                  Hassle-Free Modifications
                </h3>
                <p className="text-gray-500 text-center">
                  Quickly modify, change, or cancel your existing train bookings directly through the app or website.
                </p>
              </div>
               <div className="flex flex-col items-center bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition transform hover:scale-105 animate__animated animate__fadeInRight">
                <h3 className="text-xl font-semibold mb-2 text-sky-800">
                 Digital Ticketing & Planning
                </h3>
                <p className="text-gray-500 text-center">
                  Seamless mobile ticketing combined with advanced journey planning, providing real-time routing, connections, and platform info to streamline your entire trip.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
    );
};

export default About;