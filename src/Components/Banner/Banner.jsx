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
            className="hero  h-[500px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/20Kt7hp1/1st.jpg)",
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
            <div
            className="hero  h-[500px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/ZRNtDsFh/3rd.jpg)",
            }}
          >

        <div className="hero-overlay "></div>
            <div className="hero-content text-neutral-content flex justify-center items-center p-4">
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
           </div>
         
        </SwiperSlide>

        <SwiperSlide>
         <div
            className="hero  h-[500px] bg-no-repeat bg-center bg-contain"
            style={{
              backgroundImage: "url(https://i.ibb.co.com/20Kt7hp1/1st.jpg)",
            }}
          >
            <div className="flex justify-center items-center">
              <p>Book Now</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
