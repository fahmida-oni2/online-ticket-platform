import React from "react";
import { Link } from "react-router";
import { FaBus, FaTrain, FaPlane, FaMapMarkerAlt, FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const Card = ({ ticket }) => {
  const {
    ticketTitle,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    imageUrl,
    _id,
  } = ticket;

 
  const getIcon = () => {
    switch (transportType?.toLowerCase()) {
      case 'bus': return <FaBus />;
      case 'train': return <FaTrain />;
      case 'air': return <FaPlane />;
      default: return null;
    }
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-base-100 rounded-[2rem] overflow-hidden border border-base-300 shadow-xl group"
    >
    
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={imageUrl}
          alt={ticketTitle}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 shadow-lg">
          {getIcon()} {transportType}
        </div>
      </div>

      <div className="p-6">
        {/* Title Section */}
        <div className="mb-4">
          <h2 className="text-xl font-black text-primary uppercase tracking-tight leading-tight mb-1">
            {ticketTitle}
          </h2>
          <div className="flex items-center gap-2 text-secondary font-bold text-xs italic">
            <FaMapMarkerAlt className="text-accent" />
            <span>{fromLocation}</span>
            <span className="text-accent">→</span>
            <span>{toLocation}</span>
          </div>
        </div>

     
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-base-200 my-4">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-primary/50 uppercase tracking-widest">Departure</span>
            <div className="flex items-center gap-2 text-[11px] font-bold">
               <FaCalendarAlt className="text-accent" /> {departureDate}
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-primary/50 uppercase tracking-widest">Time</span>
            <div className="flex items-center gap-2 text-[11px] font-bold">
               <FaClock className="text-accent" /> {departureTime}
            </div>
          </div>
        </div>

        {/* Pricing & Availability */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="block text-[9px] font-black text-primary/50 uppercase tracking-widest mb-1">Price</span>
            <span className="text-2xl font-black text-primary">TK {price}</span>
          </div>
          <div className="text-right">
            <span className={`text-[10px] font-black px-2 py-1 rounded-md ${quantity > 5 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
              {quantity} SEATS LEFT
            </span>
          </div>
        </div>

      
        <Link
          to={`/all-tickets/${_id}`}
          className="block w-full text-center py-3.5 bg-primary text-white rounded-xl font-black text-xs shadow-lg shadow-primary/20 transition-all uppercase tracking-widest hover:bg-accent hover:shadow-accent/40"
        >
          Book Your Journey
        </Link>
      </div>
    </motion.div>
  );
};

export default Card;