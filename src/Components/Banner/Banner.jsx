import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "animate.css";
import { IoLogIn } from "react-icons/io5";
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
            className="hero h-100"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/qL29b15k/B1.png)",
            }}
          >
            <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content flex justify-center items-center p-4">
              <div className="space-y-6 text-center lg:text-left lg:mr-10 ">
                <h1 className="mb-10 text-5xl font-bold  animate__animated animate__fadeInLeft">
                  TicketHub: Fly, Drive, or Ride in Just One Click
                </h1>
                <p className="mb-5 lg:text-2xl font-bold animate__animated animate__fadeInRight">
                  The Center for Seamless Global Travel.
                </p>
              
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className=" mt-10">
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/cXrVhDdg/B2.png"
                alt=""
                className="h-30 w-30 rounded-full"
              />
            </div>

            <div className="space-y-6 text-center lg:text-left lg:mr-10">
              <h2 className="text-5xl text-center lg:text-6xl font-bold ">
                What TicketHub Offers?
              </h2>
              <p className="text-center lg:text-2xl">
                Seamless booking, modification, and management of tickets,
                real-time schedule information, and digital ticketing options in
                one convenient location.
              </p>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="   mt-10 ">
            <div className="space-y-6 text-center lg:text-left lg:mr-10">
              <h2 className="text-5xl lg:text-6xl font-bold text-center ">
                Book your tickets now!
              </h2>
              <div className="flex justify-center items-center">
                <Link
                  to="/tickets"
                  className="btn bg-sky-800 text-white rounded-2xl w-40  hover:bg-indigo-300"
                >
                  Book
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <img
                src="https://i.ibb.co.com/C3wzT56V/B4.png"
                alt=""
                className="h-50 w-50 rounded-full mt-5"
              />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
