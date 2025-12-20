import React from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router";

const LatestTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: latest = [] } = useQuery({
    queryKey: ["latest-tickets"],
    queryFn: async () => {
      const res = await axiosSecure.get("/latest-tickets");
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  if (latest.length === 0) return null;

  return (
    <div className="py-12 bg-white">
      <div className=" mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-sky-800">
            Available Tickets
          </h2>
          <p className="text-gray-500 mt-2">Check out our latest tickets</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latest.map((l) => (
            <div
              key={l._id}
              className=" mx-4 border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-sky-50 flex flex-col"
            >
              <div className=" h-50 flex justify-center">
                <img
                  src={l.imageUrl}
                  alt={l.ticketTitle}
                  className="w-100 h-48 mt-5 group-hover:scale-110 transition-transform duration-500"
                />
               
              </div>

              <div className="p-6 grow flex flex-col">
                <h3 className="text-xl text-center font-bold text-gray-800 mb-2">
                  {l.ticketTitle} ({l.transportType})
                </h3>
                <div className="text-sm text-gray-600 mb-4 ">
                  <p className="flex justify-between border-b py-1">
                    <span>Route:</span>
                    <span className="font-medium text-black">
                      {l.fromLocation} → {l.toLocation}
                    </span>
                  </p>
                  <p className="flex justify-between border-b py-1">
                    <span>Departure:</span>
                    <span className="text-black">
                      {l.departureDate} at {l.departureTime}
                    </span>
                  </p>
                </div>
                <div className=" mt-2  ">
                  {l.perks && l.perks.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Included Perks:
                      </h2>
                      <ul className="list-disc list-inside space-y-1">
                        {l.perks.map((perk, index) => (
                          <li key={index}>{perk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-between mt-5">
                  <span className="font-bold text-gray-600">
                    {l.price} TK (per person)
                  </span>
                  <p className="  text-sky-600">
                    Available seats: {l.quantity}
                  </p>
                </div>
                <div className="flex justify-center text-center items-center mt-4">
                  <Link
                    to={`/all-tickets/${l._id}`}
                    className="bg-sky-800 text-white  w-full  px-6 py-2 rounded-2xl hover:bg-sky-900 transition-colors font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestTickets;
