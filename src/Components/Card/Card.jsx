import React from "react";
import { Link } from "react-router";

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
  return (
    <div className="card bg-base-100 border-gray-300 shadow-xl  hover:scale-105 transition ease-in-out m-5 ">
                <h2 className="text-2xl font-bold text-center mt-5">
            {ticketTitle} ({transportType})
          </h2>
      <div className="card-body space-y-3 ">
  <div className="flex justify-center items-center">
          <figure className="h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt="Property"
            className="lg:w-full md:w-[200px] w-[250px] lg:object-cover p-2"
          />
        </figure>
        <div className="space-y-2">

          <h2 className="text-center">
            From:{fromLocation} to: {toLocation}
          </h2>
          <h2 className=" text-center">TK {price}</h2>
          <h2 className=" text-center">Available tickets: {quantity}</h2>

          <p className="text-center">
            Departure Date : {departureDate} at {departureTime}
          </p>
        </div>
  </div>
        <div className="flex justify-between mt-6 border-t pt-4">
          {ticket.perks && ticket.perks.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Included Perks:</h2>
              <ul className="list-disc list-inside space-y-1">
                {ticket.perks.map((perk, index) => (
                  <li key={index}>
                    {perk}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <Link
          to={`/all-tickets/${_id}`}
          className="flex h-10 w-full btn btn-outline gap-2 border-gray-200 text-white bg-sky-800"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default Card;
