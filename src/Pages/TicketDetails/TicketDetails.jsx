import React, { use, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";
import { Navigate, useParams, useLocation, useNavigate, Link } from "react-router";
import useCountdown from "../../Hooks/useCountdown";
import BookingModal from "../../Components/BookingModal/BookingModal";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaMapMarkerAlt, FaSuitcaseRolling, FaChair, FaClock, FaCheckCircle, FaArrowLeft } from "react-icons/fa";

const TicketDetails = () => {
  const { id } = useParams();
  const { user } = use(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: ticket, isPending } = useQuery({
    queryKey: ["ticketDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-tickets/${id}`);
      return res.data.result;
    },
    enabled: !!id,
  });

  const { countdown, isPassed } = useCountdown(
    ticket?.departureDate,
    ticket?.departureTime
  );

  if (isPending) return <Loading />;

  const isTicketExpired = isPassed;
  const isOutOfStock = ticket.quantity <= 0;
  const isBookNowDisabled = isTicketExpired || isOutOfStock;

  const handleBookNowClick = () => {
    if (!user) {
      toast.error("Please login to book a ticket!");
      navigate("/auth/login", { state: { from: location } });
      return;
    }
    setIsModalOpen(true);
  };

  const formatCountdown = () => {
    if (!countdown) return "00:00:00:00";
    const { days, hours, minutes, seconds } = countdown;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-10 animate__animated animate__fadeIn relative">
      
      {/* Back to Home Button */}
      <div className="mb-6">
        <Link 
          to="/tickets" 
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-base-300 text-secondary hover:text-primary hover:border-accent transition-all duration-300 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Explore More Trips</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Column: Information */}
        <div className="lg:w-2/3 space-y-8">
          {/* Hero Image Section */}
          <div className="relative h-64 md:h-96 rounded-[3rem] overflow-hidden shadow-2xl group">
            <img 
              src={ticket.imageUrl} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              alt={ticket.ticketTitle} 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-8 left-8">
              <span className="bg-accent text-primary px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                {ticket.transportType}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mt-2">
                {ticket.ticketTitle}
              </h1>
            </div>
          </div>

          {/* Journey Path */}
          <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-200 flex items-center justify-between shadow-sm">
            <div className="text-center">
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Origin</p>
              <h3 className="text-xl font-black text-primary uppercase">{ticket.fromLocation}</h3>
            </div>
            <div className="flex-1 flex flex-col items-center px-6">
              <div className="w-full h-[2px] bg-dashed border-t-2 border-dashed border-accent relative">
                 <FaSuitcaseRolling className="absolute -top-3 left-1/2 -translate-x-1/2 text-accent bg-base-100 px-1" size={24} />
              </div>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-secondary uppercase tracking-widest mb-1">Destination</p>
              <h3 className="text-xl font-black text-primary uppercase">{ticket.toLocation}</h3>
            </div>
          </div>

          {/* Perks Section */}
          {ticket.perks?.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-primary uppercase tracking-tighter flex items-center gap-2">
                <FaCheckCircle className="text-accent" /> Premium Amenities
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {ticket.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-base-200 rounded-2xl shadow-sm">
                    <div className="w-2 h-2 rounded-full bg-accent" />
                    <span className="text-xs font-black text-primary uppercase">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Booking Card */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 bg-white rounded-[3rem] border border-base-300 shadow-xl overflow-hidden">
            {/* Price Header */}
            <div className="bg-primary p-8 text-center">
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em] mb-1">Standard Fare</p>
              <h2 className="text-4xl font-black text-white">TK {ticket.price}</h2>
            </div>

            <div className="p-8 space-y-6">
              {/* Countdown */}
              <div className={`p-6 rounded-[2rem] text-center space-y-2 border ${isTicketExpired ? 'bg-red-50 border-red-100' : 'bg-accent/5 border-accent/20'}`}>
                <p className={`text-[10px] font-black uppercase tracking-widest ${isTicketExpired ? 'text-red-500' : 'text-primary'}`}>
                   {isTicketExpired ? 'Registration Closed' : 'Closing In'}
                </p>
                <p className={`text-xl font-black ${isTicketExpired ? 'text-red-600' : 'text-primary'}`}>
                  {formatCountdown()}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-base-100 p-4 rounded-2xl text-center">
                  <FaChair className="text-accent mx-auto mb-1" />
                  <p className="text-[9px] font-bold text-secondary uppercase">Availability</p>
                  <p className="font-black text-primary">{ticket.quantity} Seats</p>
                </div>
                <div className="bg-base-100 p-4 rounded-2xl text-center">
                  <FaClock className="text-accent mx-auto mb-1" />
                  <p className="text-[9px] font-bold text-secondary uppercase">Departure</p>
                  <p className="font-black text-primary">{ticket.departureTime}</p>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleBookNowClick}
                disabled={isBookNowDisabled}
                className={`w-full py-5 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 shadow-lg active:scale-95 ${
                  isBookNowDisabled 
                  ? 'bg-base-300 text-secondary cursor-not-allowed' 
                  : 'bg-primary text-white hover:bg-accent hover:text-primary'
                }`}
              >
                {isTicketExpired ? "Expired" : isOutOfStock ? "Sold Out" : "Secure My Seat"}
              </button>
              
              <p className="text-[9px] font-bold text-secondary text-center uppercase tracking-tighter">
                * Taxes and booking fees included at checkout
              </p>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && user && !isBookNowDisabled && (
        <BookingModal ticket={ticket} onClose={() => setIsModalOpen(false)} />
      )}
      <Toaster position="bottom-center" />
    </div>
  );
};

export default TicketDetails;