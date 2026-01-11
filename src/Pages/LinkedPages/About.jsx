import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const imgRef = useRef(null);

    useEffect(() => {
        gsap.to(imgRef.current, {
            y: -60,
            ease: "power1.out",
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.5
            }
        });
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
        }
    };

    return (
        <section className="bg-base-100 min-h-screen pb-20 overflow-x-hidden transition-colors duration-300">
            {/* Header Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="text-center px-4 pt-16  mx-auto"
            >
                <motion.span 
                    variants={itemVariants}
                    className="text-accent font-black tracking-widest uppercase text-sm mb-4 block"
                >
                    Our Story
                </motion.span>
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl md:text-6xl font-black text-primary mb-6"
                >
                    About Ticket Hub
                </motion.h2>
                <motion.p 
                    variants={itemVariants}
                    className="text-lg text-secondary font-medium leading-relaxed"
                >
                    Ticket Hub is the premier platform designed to offer a modern, efficient, and comprehensive travel experience, centralizing all your ticketing and journey management needs in one professional space.
                </motion.p>
                <div className="w-24 h-1.5 bg-accent mx-auto mt-8 rounded-full"></div>
            </motion.div>

            {/* GSAP Animated Image Container */}
            <div className="relative mt-20 mb-28 px-4  mx-auto">
                <div className="absolute -inset-4 bg-primary/5 rounded-[2.5rem] -z-10 blur-2xl"></div>
                <div className="overflow-hidden rounded-[2.5rem] shadow-2xl border border-base-200">
                    <img 
                        ref={imgRef}
                        src="https://i.ibb.co.com/BHByJdCb/happy-lovely-young-woman-orange-t-shirt-showing-plane-tickets-with-yellow-suitcase-pink-wall.jpg" 
                        alt="Premium Travel Experience" 
                        className="h-[500px] w-full object-cover scale-110" 
                    />
                </div>
            </div>

            {/* What We Offer Section */}
            <div className="bg-base-200 dark:bg-neutral/30 py-24 px-6 rounded-[3rem]   border border-base-300 dark:border-white/5">
                <div className="text-center  mx-auto mb-16">
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-5xl font-black text-primary mb-6"
                    >
                        What We Offer
                    </motion.h3>
                    <p className="text-secondary font-medium text-lg italic">
                        "Transforming uncertainty into a guaranteed, flexible, and stress-free booking experience."
                    </p>
                </div>

                {/* Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 container mx-auto"
                >
                    {[
                        { title: "Comprehensive Booking", desc: "Easily search, compare, and book tickets across multiple rail operators and routes." },
                        { title: "Real-Time Schedules", desc: "Access up-to-the-minute travel timetables, departure, and arrival information." },
                        { title: "Hassle-Free Changes", desc: "Quickly modify, change, or cancel your existing ticket bookings directly through the app." },
                        { title: "Digital Ticketing", desc: "Seamless mobile ticketing combined with advanced journey planning and real-time routing." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -12 }}
                            className="bg-base-100 p-10 rounded-[2rem] shadow-xl border border-base-300 dark:border-white/10 transition-all duration-300 group"
                        >
                            <div className="w-14 h-14 bg-primary/10 rounded-2xl mb-6 flex items-center justify-center group-hover:bg-primary group-hover:rotate-6 transition-all duration-500">
                                <span className="text-primary group-hover:text-primary-content font-black text-xl">{index + 1}</span>
                            </div>
                            <h4 className="text-xl font-black mb-4 text-base-content group-hover:text-primary transition-colors">
                                {feature.title}
                            </h4>
                            <p className="text-secondary text-sm leading-relaxed font-medium">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default About;