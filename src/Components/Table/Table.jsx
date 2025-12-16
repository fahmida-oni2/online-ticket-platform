import React from "react";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router";


const Table = ({ ticket,onDelete }) => {
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
    const status =
    verificationStatus === "Accepted"
      ? "bg-green-100 text-green-800"
      : verificationStatus === "Pending"
      ? "bg-yellow-100 text-yellow-800"
      : "bg-red-100 text-red-800";
  return (
    <div>
       <tr className="border-b hover:bg-gray-50 transition duration-150 ">
      <td className="px-6 py-4  text-black font-bold whitespace-nowrap">
       {ticketTitle}
      </td>

      {/* type */}
      <td className="px-6 py-4 text-black whitespace-nowrap">{transportType}</td>
      {/* location */}
        <td className="px-6 py-4 text-black whitespace-nowrap">From {fromLocation} to {toLocation}</td>
      {/* Price */}
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {price} TK
      </td>

      {/* quantity */}
       <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {quantity} seats
      </td>

      {/* Status */}
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={`inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium ${status}`}
        >
          {verificationStatus}
        </span>
      </td>

      {/* Date & time*/}
      <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
        {departureDate} and {departureTime}
      </td>

      {/* Actions (Delete Button) */}
      <td className="px-6 py-4 text-right whitespace-nowrap">
        <Link
          href={`/all-kits/${_id}`}
          className="inline-flex items-center r  px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white  bg-secondary hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mr-3"
        >
          <GrFormView />
        </Link>
         <Link
          href={`/update-kit/${_id}`}
          className="inline-flex items-center  px-2  py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mr-3"
        >
          <RxUpdate />
        </Link>

        <button
          onClick={() => onDelete(_id)}
          className="inline-flex items-center  py-2 px-3 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150"
        >
         <MdDelete />
        </button>
      </td>
    
    </tr>
    </div>
  );
};

export default Table;

  // const formattedDate = new Date(
  //   kit.created_date || new Date()
  // ).toLocaleDateString();

  // const formattedPrice = (kit.price || 0).toFixed(2);

 
