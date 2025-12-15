import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router";

const VendorCard = ({ ticket }) => {
  const {
    ticketTitle,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    departureDate,
    departureTime,
    perks,
    _id,
    verificationStatus,
  } = ticket;
  return (
    <div className="card  bg-base-100 border-gray-300 shadow-xl  hover:scale-105 transition ease-in-out m-5 ">
      <div>
        
        <div className="card-body space-y-3">
          <h2 className="text-2xl font-bold text-center">{ticketTitle} <span className="font-normal text-sky-800">({transportType})</span></h2>
          <h2 className="text-2xl font-bold text-center"></h2>
          <h2 className="text-center">
            From {fromLocation} to {toLocation}
          </h2>
          <h2 className=" text-center">
            Date: {departureDate}, time : {departureTime}
          </h2>
          <div className="grid gap-2 justify-center">
            <button className="flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-green-500 bg-base-300">
              price :{price} TK
            </button>
            <button className="flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-red-500 bg-base-300">
              {verificationStatus}
            </button>
            <button className="flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-orange-500 bg-base-300">
              Quantity :{quantity} Seats
            </button>
          </div>
       
        </div>
      </div>

      <Toaster></Toaster>
    </div>
  );
};

export default VendorCard;
