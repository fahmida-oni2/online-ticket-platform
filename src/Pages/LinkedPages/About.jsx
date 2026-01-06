import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
    const imgRef = useRef(null);

    useEffect(() => {
       
        gsap.to(imgRef.current, {
            y: -50,
            ease: "none",
            scrollTrigger: {
                trigger: imgRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    }, []);

  
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="flex flex-col min-h-screen mb-10 overflow-x-hidden">
            {/* Header Section */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
                className="text-center px-4"
            >
                <motion.h2 
                    variants={itemVariants}
                    className="text-4xl mt-10 text-sky-800 font-bold mb-4"
                >
                    About Us
                </motion.h2>
                <motion.p 
                    variants={itemVariants}
                    className="mb-12 italic text-black  mx-auto leading-relaxed"
                >
                    <span className="font-bold text-sky-700">Ticket Hub:</span> Travel All In One Place <br />
                    Ticket Hub is the premier platform designed to offer a modern, efficient, and comprehensive travel experience, centralizing all your ticketing and journey management needs.
                </motion.p>
            </motion.div>

            {/* GSAP Animated Image Container */}
            <div className="flex mb-16 justify-center items-center px-4 overflow-hidden rounded-2xl max-w-5xl mx-auto">
                <img 
                    ref={imgRef}
                    src="https://i.ibb.co.com/BHByJdCb/happy-lovely-young-woman-orange-t-shirt-showing-plane-tickets-with-yellow-suitcase-pink-wall.jpg" 
                    alt="Travel" 
                    className="h-[400px] w-full object-cover rounded-2xl shadow-2xl" 
                />
            </div>

            {/* What We Offer Section */}
            <div className="bg-gray-50 py-16 px-6 rounded-3xl mx-4 lg:mx-10 shadow-inner">
                <div className="text-center space-y-3 mb-12">
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-4xl text-sky-800 font-bold"
                    >
                        What We Offer
                    </motion.h1>
                    <p className="text-gray-600  mx-auto">
                        Ticket Hub transforms the frustrating uncertainty of waitlisted tickets and plan changes into a guaranteed, flexible, and stress-free booking experience.
                    </p>
                </div>

                {/* Cards Grid */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 ml-5 mr-5 mx-auto"
                >
                    {[
                        { title: "Comprehensive Booking", desc: "Easily search, compare, and book tickets across multiple rail operators and routes." },
                        { title: "Real-Time Schedules", desc: "Access up-to-the-minute travel timetables, departure, and arrival information." },
                        { title: "Hassle-Free Modifications", desc: "Quickly modify, change, or cancel your existing ticket bookings directly through the app." },
                        { title: "Digital Ticketing", desc: "Seamless mobile ticketing combined with advanced journey planning and real-time routing." }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
                            className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-md border border-gray-100 transition-all"
                        >
                            <div className="w-12 h-12 bg-sky-100 rounded-full mb-4 flex items-center justify-center">
                                <span className="text-sky-800 font-bold">{index + 1}</span>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-sky-800 text-center">
                                {feature.title}
                            </h3>
                            <p className="text-gray-500 text-center text-sm leading-relaxed">
                                {feature.desc}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default About;