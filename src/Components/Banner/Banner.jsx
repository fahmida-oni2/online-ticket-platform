import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "animate.css";
import { Link } from "react-router";
const Banner = () => {
  return (
    <div className="object-cover">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div
            className="hero h-100 w-full  bg-no-repeat"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/WNKDJqpL/6345959.jpg)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-white flex justify-center items-center p-4">
              <div className="space-y-6 text-center  lg:mr-10 ">
                <h1 className="mb-5 text-3xl font-bold  animate__animated animate__fadeInLeft">
                  TicketHub: Fly, Drive, or Ride in Just One Click
                </h1>
                <p className="mb-5 lg:text-2xl font-bold animate__animated animate__fadeInRight">
                  The Center for Seamless Global Travel.
                </p>
                <Link
                  to={"/tickets"}
                  className="bg-sky-800 text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition-colors font-medium"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div
            className="hero h-100 w-full  bg-no-repeat "
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/5XVfDwYW/freepik-talk-28605.png)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-white flex justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10">
                <h2 className="text-2xl text-center lg:text-4xl font-bold  ">
                  What TicketHub Offers?
                </h2>
                <p className="text-center lg:text-2xl">
                  Seamless booking, modification, and management of tickets,
                  real-time schedule information, and digital ticketing options
                  in one convenient location.
                </p>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="hero h-100 w-full  bg-no-repeat"
            style={{
              backgroundImage:
                "url(https://i.ibb.co.com/x8hFJFZz/10112781.jpg)",
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <Link
                to={"/tickets"}
                className="bg-sky-800 text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition-colors font-medium"
              >
                Book Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
