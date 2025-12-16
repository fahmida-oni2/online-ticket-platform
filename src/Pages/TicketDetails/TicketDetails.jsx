import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../../Components/Loading/Loading";
import { useParams } from "react-router";
import useCountdown from "../../Hooks/useCountdown";
import BookingModal from "../../Components/BookingModal/BookingModal";

const TicketDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: ticket, isPending } = useQuery({
    queryKey: ["ticketDetails", id],

    queryFn: async () => {
      if (!id) {
        toast.error("Ticket ID is missing.");
        return null;
      }

      const res = await axiosSecure.get(`/all-tickets/${id}`);
      return res.data.result;
    },
    enabled: !!id,
  });
  const { countdown, isPassed } = useCountdown(
    ticket?.departureDate,
    ticket?.departureTime
  );

  if (isPending) {
    return <Loading></Loading>;
  }

  const isTicketExpired = isPassed;
  const isOutOfStock = ticket.quantity <= 0;
  const isBookNowDisabled = isTicketExpired || isOutOfStock;
  const formatCountdown = () => {
    if (!countdown) return "Calculating...";
    if (isPassed) return "EXPIRED";

    const { days, hours, minutes, seconds } = countdown;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mb-10 bg-white shadow-lg rounded-lg mt-10">
      <div className="flex justify-center">
        <figure>
          <img src={ticket.imageUrl} alt="" />
        </figure>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {ticket.ticketTitle}
      </h1>
      <p className="text-center">
        <strong>Transport Type:</strong> {ticket.transportType}
      </p>

      <div className="flex justify-between">
        <div>
          <div className="flex gap-10">
            <p>
              <strong>From:</strong> {ticket.fromLocation}
            </p>
            <p>
              <strong>To:</strong> {ticket.toLocation}
            </p>
          </div>
          <div>
            <p>
              <strong>Price:</strong> TK {ticket.price}
            </p>
            <p>
              <strong>Seats:</strong> {ticket.quantity}
            </p>
          </div>

          <p>
            <strong>Departure:</strong> {ticket.departureDate} at{" "}
            {ticket.departureTime}
          </p>
        </div>
        <div
          className={`p-10 w-50 h-50  rounded-full text-white font-bold text-center ${
            isTicketExpired ? "bg-red-500" : "bg-green-600"
          }`}
        >
          <span className="mr-2">Time Remaining:</span> <br />
          <span className="text-2xl">{formatCountdown()}</span>
        </div>
      </div>

      <div className="flex justify-between mt-6 border-t pt-4">
        {ticket.perks && ticket.perks.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Included Perks:</h2>
            <ul className="list-disc list-inside space-y-1">
              {ticket.perks.map((perk, index) => (
                <li key={index} className="text-gray-700">
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div>
        {/* Book Now Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className={`px-12 py-3 text-xl rounded-3xl font-semibold  transition duration-200 ${
              isBookNowDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-sky-800 text-white hover:bg-green-700"
            }`}
            disabled={isBookNowDisabled}
          >
            {isTicketExpired
              ? "EXPIRED"
              : isOutOfStock
              ? "SOLD OUT"
              : "Book Now"}
          </button>
        </div>

        {isModalOpen && !isBookNowDisabled && (
          <BookingModal ticket={ticket} onClose={() => setIsModalOpen(false)} />
        )}
      </div>
      <Toaster></Toaster>
    </div>
  );
};

export default TicketDetails;
