import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const Guideline = () => {
    const steps = [
        {
            id: 1,
            title: "Step 1",
            desc: "Visit Ticket Hub and Choose Journey Date",
            img: "https://i.ibb.co.com/nNjtWCdL/image.png"
        },
        {
            id: 2,
            title: "Step 2",
            desc: "Select Class and Look for Available Transport",
            img: "https://i.ibb.co.com/8g2WLJ7q/image.png"
        },
        {
            id: 3,
            title: "Step 3",
            desc: "Add Your User ID and Passenger Information",
            img: "https://i.ibb.co.com/1tHrvbF5/image.png"
        },
        {
            id: 4,
            title: "Step 4",
            desc: "Choose a Secure Method for Payment",
            img: "https://i.ibb.co.com/HLz0tX50/image.png"
        },
        {
            id: 5,
            title: "Step 5",
            desc: "Enter Your Password to Confirm Booking",
            img: "https://i.ibb.co.com/DPfz1rLL/image.png"
        }
    ];

    return (
        <section className='py-20 bg-base-100 overflow-hidden'>
            <div className='container mx-auto px-4'>
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight">
                        Booking Guideline
                    </h2>
                    <div className="w-24 h-1.5 bg-accent mx-auto mt-4 rounded-full"></div>
                    <p className="mt-6 text-secondary font-medium max-w-2xl mx-auto">
                        Your next adventure is just five simple steps away. Here is how you can book and pay for your journey seamlessly.
                    </p>
                </div>

                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'} 
                    coverflowEffect={{
                        rotate: 0,
                        stretch: 0,
                        depth: 100,
                        modifier: 2.5,
                        scale: 0.85,
                        slideShadows: false, 
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="pb-14" 
                >
                    {steps.map((step) => (
                        <SwiperSlide key={step.id} className="max-w-[350px]">
                            <div className='bg-base-100 p-8 rounded-[2rem] shadow-2xl border border-base-200 flex flex-col items-center text-center h-[450px] transition-all duration-500 group hover:border-accent'>
                                {/* Image Container */}
                                <div className='mb-8 w-full h-48 bg-neutral/5 rounded-2xl overflow-hidden flex items-center justify-center p-4'>
                                    <img 
                                        className='max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500' 
                                        src={step.img} 
                                        alt={step.desc} 
                                    />
                                </div>
                                
                                {/* Content */}
                                <div className='mt-auto'>
                                    <span className='inline-block px-4 py-1 rounded-full bg-success/10 text-success text-sm font-bold mb-3'>
                                        {step.title}
                                    </span>
                                    <h3 className='text-xl font-bold text-base-content leading-snug'>
                                        {step.desc}
                                    </h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

           
            <style dangerouslySetInnerHTML={{ __html: `
                .swiper-pagination-bullet { background: var(--color-secondary) !important; }
                .swiper-pagination-bullet-active { background: var(--color-primary) !important; width: 30px; border-radius: 5px; }
            `}} />
        </section>
    );
};

export default Guideline;