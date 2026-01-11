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
    <section className="w-full h-100 rounded-2xl overflow-hidden shadow-2xl">
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
            
              <div className="absolute inset-0 bg-gradient-to-r from-neutral/90 via-neutral/50 to-transparent" />

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
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-primary-content leading-[1.1] tracking-tight drop-shadow-md"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    variants={itemVariants}
                    className="mt-6 text-lg md:text-2xl text-primary-content/80 font-normal max-w-xl leading-relaxed drop-shadow-sm"
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.div variants={itemVariants} className="mt-10">
                    <Link
                      to={slide.link}
                     
                      className="btn btn-primary md:btn-lg rounded-full px-10 hover:btn-secondary border-none transition-all duration-300 shadow-xl shadow-neutral/40 transform hover:-translate-y-1"
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

     
      <style dangerouslySetInnerHTML={{ __html: `
        .swiper-pagination-bullet { background: var(--color-primary-content) !important; opacity: 0.5; }
        .swiper-pagination-bullet-active { background: var(--color-accent) !important; opacity: 1; width: 24px; border-radius: 4px; }
      `}} />
    </section>
  );
};

export default Banner;