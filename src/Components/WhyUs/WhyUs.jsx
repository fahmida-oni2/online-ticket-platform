import React from 'react';
import Marquee from 'react-fast-marquee';

const WhyUs = () => {
  return (
    <section className="py-16 bg-base-100 overflow-hidden">
      {/* Section Header */}
      <div className="container mx-auto px-4 text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-primary mb-4 animate__animated animate__fadeInDown">
          Why Choose Us
        </h2>
        <div className="w-24 h-1.5 bg-accent mx-auto mb-6 rounded-full"></div>
        <p className="max-w-2xl mx-auto text-secondary font-medium animate__animated animate__fadeInUp">
          Experience a professional and seamless platform for global ticket booking. 
          Ticket Hub offers a premium travel experience tailored for the modern passenger.
        </p>
      </div>

      {/* Marquee Features */}
      <Marquee pauseOnClick pauseOnHover speed={40} gradient={false}>
        {/* Feature Card 1 */}
        <div className="card w-96 h-96 shadow-xl mb-10 mx-4 bg-primary text-primary-content border border-primary-content/10 transition-transform duration-300 hover:scale-105">
          <figure className="px-10 pt-10">
            <div className="p-1 rounded-full bg-accent/20 border-2 border-accent">
              <img
                src="https://i.ibb.co.com/WvkHBwkN/image.png"
                alt="Connectivity"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-xl text-accent">Global Connectivity</h2>
            <p className="text-sm opacity-90">
              Find and book connecting trains, buses, and flights with real-time seat availability.
            </p>
          </div>
        </div>

        {/* Feature Card 2 */}
        <div className="card w-96 h-96 shadow-xl mb-10 mx-4 bg-secondary text-secondary-content border border-secondary-content/10 transition-transform duration-300 hover:scale-105">
          <figure className="px-10 pt-10">
            <div className="p-1 rounded-full bg-accent/20 border-2 border-accent">
              <img
                src="https://i.ibb.co.com/4ZgZdXcc/image.png"
                alt="Cancellation"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-xl">Free Cancellation</h2>
            <p className="text-sm opacity-90">
              Get full fare refunds on your ticket cancellations with our hassle-free protection policy.
            </p>
          </div>
        </div>

        {/* Feature Card 3 */}
        <div className="card w-96 h-96 shadow-xl mb-10 mx-4 bg-neutral text-neutral-content border border-neutral-content/10 transition-transform duration-300 hover:scale-105">
          <figure className="px-10 pt-10">
            <div className="p-1 rounded-full bg-accent/20 border-2 border-accent">
              <img
                src="https://i.ibb.co.com/gFjNP1j3/image.png"
                alt="Deals"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-xl text-accent">Exclusive Deals</h2>
            <p className="text-sm opacity-90">
              Unlock premium travel discounts and seasonal offers exclusive to Ticket Hub members.
            </p>
          </div>
        </div>

        {/* Feature Card 4 */}
        <div className="card w-96 h-96 shadow-xl mb-10 mx-4 bg-primary text-primary-content border border-primary-content/10 transition-transform duration-300 hover:scale-105">
          <figure className="px-10 pt-10">
            <div className="p-1 rounded-full bg-accent/20 border-2 border-accent">
              <img
                src="https://i.ibb.co.com/JjH7Kw4G/image.png"
                alt="Customer Care"
                className="w-32 h-32 rounded-full object-cover"
              />
            </div>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-xl text-accent">24/7 Support</h2>
            <p className="text-sm opacity-90">
              Get immediate resolutions for all your queries from our dedicated customer care team.
            </p>
          </div>
        </div>
      </Marquee>
    </section>
  );
};

export default WhyUs;