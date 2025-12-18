import React from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router";
import useCountdown from "../../Hooks/useCountdown";
import Payment from "../../Pages/Dashboard/Payment/Payment";

const BookingCard = ({ ticket, onDelete }) => {
  const {
    image,
    ticketTitle,
    fromLocation,
    toLocation,
    transportType,
    unitPrice,
    bookingQuantity,
    departureDate,
    departureTime,
    _id,
    bookingStatus,
  
  } = ticket;
  const { countdown, isPassed } = useCountdown(
    ticket?.departureDate,
    ticket?.departureTime
  );

  const totalPrice = (unitPrice || 0) * (bookingQuantity || 0);
  const isTicketExpired = isPassed;
  const isPayNowDisabled = isTicketExpired || bookingStatus !== "accepted";
  const showCountdown = bookingStatus !== "rejected";

  const formatCountdown = () => {
    if (isTicketExpired) return "EXPIRED";
    if (!countdown) return "Calculating...";

    const { days, hours, minutes, seconds } = countdown;
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  let statusColor = "text-gray-600";
  switch (bookingStatus?.toLowerCase()) {
    case "accepted":
      statusColor = "text-green-600 font-bold";
      break;
    case "paid":
      statusColor = "text-blue-600 font-bold";
      break;
    case "rejected":
      statusColor = "text-red-600 font-bold";
      break;
    case "pending":
    default:
      statusColor = "text-yellow-600 font-bold";
      break;
  }
  return (
    <div className="card bg-base-100 border-gray-300 shadow-xl hover:scale-105 transition ease-in-out m-5">
      <div>
        <div className="card-body space-y-3">
          <div className="flex justify-center">
            <figure>
              <img
                src={image}
                alt={ticketTitle}
                className="h-40 object-cover rounded-md"
              />
            </figure>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {ticketTitle}
          </h1>

          {/* Booking Status */}
          <p className="text-center text-xl">
            <strong>Status:</strong>{" "}
            <span className={statusColor}>
              {bookingStatus?.toUpperCase() || "N/A"}
            </span>
          </p>

          <p className="text-center">
            <strong>Transport Type:</strong> {transportType}
          </p>

          {/* Location, Price, Quantity */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-lg">
                <strong >From:</strong> <span className="mr-5">{fromLocation}</span>
                <strong>To:</strong>
                {toLocation}
              </p>
              <p>
                <strong>Total Price:</strong> TK {totalPrice.toLocaleString()}
              </p>
              <p>
                <strong>Seats Booked:</strong> {bookingQuantity}
              </p>
            </div>

            {showCountdown && (
              <div
                className={`p-4 w-32 h-32 rounded-full text-white font-bold text-center flex flex-col justify-center items-center ${
                  isTicketExpired ? "bg-red-500" : "bg-green-600"
                }`}
              >
                <span className="text-sm">Time Remaining:</span>
                <span className="text-lg mt-1">{formatCountdown()}</span>
              </div>
            )}
          </div>

          {/* Departure */}
          <p className="border-t pt-2">
            <strong>Departure:</strong> {departureDate} at {departureTime}
          </p>
        </div>
      </div>

     
      <div className="px-6 pb-6 pt-4 border-t">
        {/* Pay Buttons */}
        <div className="flex justify-between items-center">
          {bookingStatus?.toLowerCase() === "accepted" && (
            <Link
              to={!isPayNowDisabled ? `/dashboard/payment/${_id}` : "#"}
              className={`inline-flex items-center px-3 py-2 border border-transparent text-sm rounded-2xl font-semibold transition duration-200 ${
                isPayNowDisabled
                  ? "bg-gray-400 cursor-not-allowed pointer-events-none"
                  : "bg-sky-800 text-white hover:bg-sky-700"
              }`}
            >
              {isTicketExpired ? "EXPIRED" : "Pay Now"}
            </Link>
          )}

          {(bookingStatus?.toLowerCase() !== "accepted" ||
            isPayNowDisabled) && <div className="w-1/2"></div>}

          {/* Delete Button */}
          <button
            onClick={() => onDelete(_id)}
            className="inline-flex rounded-2xl items-center py-2 px-3 border border-transparent text-sm font-medium shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
          >
            <MdDelete className="mr-1" /> Delete
          </button>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default BookingCard;
