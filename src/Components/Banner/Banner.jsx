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
    subtitle: "The center for seamless global travel. Book your next journey in just one click.",
    buttonText: "Get Started",
    link: "/tickets",
  },
  {
    image: "https://i.ibb.co.com/Mk25sCTd/christmas-travel-concept-with-airplane.jpg",
    title: "What TicketHub Offers?",
    subtitle: "Seamless booking, modification, and real-time schedules in one premium location.",
    buttonText: "Explore Offers",
    link: "/tickets",
  },
  {
    image: "https://i.ibb.co.com/x8hFJFZz/10112781.jpg",
    title: "Ready for Adventure?",
    subtitle: "Your journey begins here. Reliable digital ticketing for every destination worldwide.",
    buttonText: "Book Now",
    link: "/tickets",
  },
];

const containerVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

const Banner = () => {
  return (
    <section className="w-full h-100 rounded-2xl overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop={true}
        speed={1000}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="h-full w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative h-full w-full bg-cover bg-center transition-transform duration-[6000ms] ease-linear scale-100"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Enhanced Overlay for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/50 to-transparent" />

              <div className="relative z-10 flex h-full items-center px-8 md:px-24">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  className="max-w-3xl"
                >
                  <motion.h1
                    variants={itemVariants}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="mt-6 text-lg md:text-2xl text-slate-100 font-normal max-w-xl leading-relaxed drop-shadow-sm opacity-95"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div variants={itemVariants} className="mt-10">
                    <Link
                      to={slide.link}
                      className="inline-flex items-center justify-center px-10 py-4 bg-sky-600 hover:bg-sky-500 text-white text-lg font-bold rounded-full transition-all duration-300 shadow-xl shadow-sky-900/40 hover:shadow-sky-400/20 transform hover:-translate-y-1"
                    >
                      {slide.buttonText}
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Global Style for Swiper Pagination visibility */}
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { background: white !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: #0ea5e9 !important; opacity: 1; width: 24px; border-radius: 4px; }
      `}} />
    </section>
  );
};

export default Banner;