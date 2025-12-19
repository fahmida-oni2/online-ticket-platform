import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';

const Guideline = () => {
    const steps = [
        {
            id: 1,
            title: "Step 1:",
            desc: "Visit Ticket Hub and Choose journey Date",
            img: "https://i.ibb.co.com/nNjtWCdL/image.png"
        },
        {
            id: 2,
            title: "Step 2:",
            desc: "Select Class and Look for Available Trains",
            img: "https://i.ibb.co.com/8g2WLJ7q/image.png"
        },
        {
            id: 3,
            title: "Step 3:",
            desc: "Add Your User ID and Passenger Information",
            img: "https://i.ibb.co.com/1tHrvbF5/image.png"
        },
        {
            id: 4,
            title: "Step 4:",
            desc: "Choose a Method for Payment",
            img: "https://i.ibb.co.com/HLz0tX50/image.png" // Fixed the extra 'g' in .pngg
        },
        {
            id: 5,
            title: "Step 5:",
            desc: "Enter Your Password to Confirm the Booking",
            img: "https://i.ibb.co.com/DPfz1rLL/image.png"
        }
    ];

    return (
        <div className='py-12 bg-gray-50 overflow-hidden'>
            <div className='container mx-auto px-4'>
                <h2 className="text-4xl text-center text-black font-bold mb-4">
                    Guideline
                </h2>
                <p className="text-center mb-10 text-gray-600 max-w-2xl mx-auto">
                    You can book train tickets in just five steps. Here's how to book and pay for your journey.
                </p>

                <Swiper
                    loop={true}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'3'} 
                    coverflowEffect={{
                        rotate: 30,
                        stretch:'50%',
                        depth: 200,
                        modifier: 1,
                         scale: 0.75,
                        slideShadows: true, 
                    }}
                    autoplay={{
                        delay: 2000,
                        disableOnInteraction: false,
                    }}
                    pagination={ true }
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper" 
                >
                    {steps.map((step) => (
                        <SwiperSlide key={step.id} className="max-w-[350px]">
                            <div className='bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col items-center text-center h-full transition-all'>
                                <div className='mb-6 bg-sky-50  '>
                                    <img 
                                        className='w-full h-full' 
                                        src={step.img} 
                                        alt={step.desc} 
                                    />
                                </div>
                                <h3 className='text-xl font-bold mb-2'>
                                    <span className='text-green-600 block mb-1'>{step.title}</span>
                                    <span className='text-gray-800 text-lg font-medium leading-relaxed'>
                                        {step.desc}
                                    </span>
                                </h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Guideline;