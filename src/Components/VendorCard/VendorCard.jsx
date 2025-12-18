import React from "react";
import { Toaster } from "react-hot-toast";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router";

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
    status,
    imageUrl,
  } = ticket;
  return (
    <div className="card  bg-base-100 border-gray-300 shadow-xl  hover:scale-105 transition ease-in-out m-5 ">
      <div>
        <div className="card-body space-y-3">
          <figure>
            <img src={imageUrl} alt="" />
          </figure>
          <h2 className="text-2xl font-bold text-center">
            {ticketTitle}
            <span className="font-normal text-sky-800">({transportType})</span>
          </h2>
          <h2 className="text-2xl font-bold text-center"></h2>
          <h2 className="text-center">
            From {fromLocation} to {toLocation}
          </h2>
          <h2 className=" text-center">
            Departure Date: {departureDate} and time : {departureTime}
          </h2>
          <div className="grid gap-2 justify-center">
            <button className="flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-green-500 bg-base-300">
              price :{price} TK
            </button>
            <button
              className={`flex h-10 w-30 btn btn-outline gap-2 border-gray-200 bg-base-300 
    ${status === "approved" ? "text-green-500" : "text-red-500"}`}
            >
              {status}
            </button>
            <button className="flex h-10 w-30 btn btn-outline gap-2 border-gray-200 text-orange-500 bg-base-300">
              Quantity :{quantity} Seats
            </button>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => onEdit(ticket)}
              className="inline-flex items-center px-2 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mr-3"
            >
              <RxUpdate /> Update
            </button>
            <button
              onClick={() => onDelete(_id)}
              className="inline-flex items-center  py-2 px-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
            >
              <MdDelete /> Delete
            </button>
          </div>
        </div>
      </div>

      <Toaster></Toaster>
    </div>
  );
};

export default VendorCard;
