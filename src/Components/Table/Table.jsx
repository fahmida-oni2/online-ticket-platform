import React from "react";
import { GrFormView } from "react-icons/gr";
import {  MdCampaign, MdOutlineCampaign } from "react-icons/md";
import { Link } from "react-router"; 

const Table = ({ ticket, index, onAdvertise }) => {
  const {
    ticketTitle,
    fromLocation,
    toLocation,
    transportType,
    price,
    quantity,
    isAdvertised,
    _id,
  } = ticket;

  return (
    <tr className="border-b hover:bg-gray-50 transition duration-150">
      <td className="px-4 py-4 font-medium text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 text-black font-bold whitespace-nowrap">
        {ticketTitle}
      </td>
      <td className="px-6 py-4 text-gray-600">{transportType}</td>
      <td className="px-6 py-4 text-gray-600 whitespace-nowrap">
        {fromLocation} to {toLocation}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-800">{price} TK</td>
      <td className="px-6 py-4 text-gray-500">{quantity} seats</td>

      {/* Advertise Toggle Button */}
      <td className="px-6 py-4">
        <button
          onClick={() => onAdvertise(_id, isAdvertised)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold transition-all ${
            isAdvertised
              ? "bg-purple-600 text-white shadow-md hover:bg-purple-700"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {isAdvertised ? <MdCampaign size={16} /> : <MdOutlineCampaign size={16} />}
          {isAdvertised ? "ADVERTISED" : "ADVERTISE"}
        </button>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right space-x-2">
        <Link
          to={`/all-tickets/${_id}`}
          className="inline-flex items-center p-2 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition"
        >
          <GrFormView size={20} />
        </Link>
   
      </td>
    </tr>
  );
};

export default Table;