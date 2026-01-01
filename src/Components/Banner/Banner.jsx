
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Link } from "react-router";

const slides = [
  {
    image: "https://i.ibb.co.com/WNKDJqpL/6345959.jpg",
    title: "TicketHub: Fly, Drive, or Ride",
    subtitle: "The Center for Seamless Global Travel. Book in just one click.",
    buttonText: "Get Started",
    link: "/tickets",
  },
  {
    image: "https://i.ibb.co.com/Mk25sCTd/christmas-travel-concept-with-airplane.jpg",
    title: "What TicketHub Offers?",
    subtitle: "Seamless booking, modification, and real-time schedules in one location.",
    buttonText: "Explore Offers",
    link: "/tickets",
  },
  {
    image: "https://i.ibb.co.com/x8hFJFZz/10112781.jpg",
    title: "Ready for Adventure?",
    subtitle: "Your journey begins here. Reliable digital ticketing for every destination.",
    buttonText: "Book Now",
    link: "/tickets",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Banner = () => {
  return (
    <section className="w-full h-[60vh] md:h-[80vh] my-6 mt-0">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="h-full w-full overflow-hidden rounded-xl"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-blue-900/40 to-transparent" />

              <div className="relative z-10 flex h-full items-center px-6 md:px-20">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="max-w-2xl backdrop-blur-md bg-white/10 border border-white/20 p-8 md:p-12 rounded-3xl text-white"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="mt-4 text-lg md:text-xl text-sky-100/90 font-medium"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div variants={itemVariants} className="mt-8">
                    <Link
                      to={slide.link}
                      className="inline-block px-8 py-4 bg-sky-700 hover:bg-sky-400 text-white font-bold rounded-2xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-sky-900/20"
                    >
                      {slide.buttonText}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Banner;