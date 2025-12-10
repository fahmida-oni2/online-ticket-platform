import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
const Guideline = () => {
    return (
        <div className='mb-5'>
            <h2 className="text-4xl text-center text-black font-bold mb-4 animate__animated animate__fadeInDown">
        Guideline
      </h2>
      <p className="text-center mb-5 animate__animated animate__fadeInUp ">
        You can book train tickets in just five steps.Here's how to book and pay for a train ticket. 
      </p>
      <div>
        <Swiper
        slidesPerView={3}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <div className='flex justify-center'>
            <img className='h-50 w-40' src="https://i.ibb.co.com/nNjtWCdL/image.png" alt="" />
            </div>
          <h2><span className='text-green-500'>Step 1:</span> Visit RailTransit Hub and Choose journey Date</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div  className='flex justify-center'> 
            <img className='h-50 w-40' src="https://i.ibb.co.com/8g2WLJ7q/image.png" alt="" />
          </div>
          <h2><span className='text-green-500'>Step 2:</span> Select Class and Look for Available Trains</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div  className='flex justify-center'>
            <img className='h-50 w-40' src="https://i.ibb.co.com/1tHrvbF5/image.png" alt="" />
          </div>
          <h2><span className='text-green-500'>Step 3:</span> Add Your User ID and Passenger Information</h2>
        </SwiperSlide>
        <SwiperSlide>
          <div  className='flex justify-center'>
            <img className='h-50 w-40' src="https://i.ibb.co.com/HLz0tX50/image.pngg" alt="" />
          </div>
          <h2><span className='text-green-500'>Step 4:</span> Choose a Method for Payment</h2>
        </SwiperSlide>
        <SwiperSlide>
         <div  className='flex justify-center'>
             <img className='h-50 w-40' src="https://i.ibb.co.com/DPfz1rLL/image.png" alt="" />
         </div>
          <h2><span className='text-green-500'>Step 5:</span> Enter Your Password to Confirm the Booking</h2>
        </SwiperSlide>
      </Swiper>
      </div>
        </div>
    );
};

export default Guideline;