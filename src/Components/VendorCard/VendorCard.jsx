import React from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete, MdLocationOn } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaBus, FaTrain, FaPlane, FaChair, FaClock } from "react-icons/fa";

const VendorCard = ({ ticket, onDelete, onEdit }) => {
  const {
    ticketTitle,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    _id,
    verificationStatus, 
    imageUrl,
  } = ticket;


  const getTransportIcon = () => {
    switch (transportType?.toLowerCase()) {
      case "bus": return <FaBus />;
      case "train": return <FaTrain />;
      case "flight": return <FaPlane />;
      default: return <FaBus />;
    }
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-base-300 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Header with Status Badge */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={ticketTitle} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
        
        {/* Verification Badge */}
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
          verificationStatus === "approved" 
          ? "bg-green-500 text-white" 
          : "bg-amber-500 text-white"
        }`}>
          {verificationStatus || "Pending"}
        </div>

        {/* Transport Type Badge */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-primary text-xs font-black uppercase tracking-tighter">
          {getTransportIcon()} {transportType}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex flex-col flex-grow space-y-4">
        <div>
          <h2 className="text-lg font-black text-primary uppercase leading-tight line-clamp-1">
            {ticketTitle}
          </h2>
          <div className="flex items-center gap-2 mt-2 text-secondary text-xs font-bold uppercase tracking-wider">
            <MdLocationOn className="text-accent" /> {fromLocation} 
            <span className="text-accent">→</span> {toLocation}
          </div>
        </div>

        {/* Travel Specs Grid */}
        <div className="grid grid-cols-2 gap-3 py-4 border-y border-dashed border-base-300">
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-secondary uppercase opacity-60">Departure</span>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
              <FaClock className="text-accent" size={10} /> {departureTime}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-secondary uppercase opacity-60">Availability</span>
            <span className="text-[11px] font-bold text-primary flex items-center gap-1">
              <FaChair className="text-accent" size={10} /> {quantity} Seats
            </span>
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="pt-2">
          <div className="flex items-baseline gap-1 mb-4">
            <span className="text-[10px] font-black text-secondary uppercase">Price:</span>
            <span className="text-xl font-black text-primary">TK {price}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(ticket)}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-white bg-primary hover:bg-accent transition-all shadow-md active:scale-95"
            >
              <RxUpdate size={14} /> Update
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="px-4 inline-flex items-center justify-center py-3 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-all shadow-md active:scale-95"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default VendorCard;