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
    <div className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Available Tickets
          </h2>
          <div className="w-20 h-1.5 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-secondary font-medium mt-4">
            Discover our most recent travel routes and destinations
          </p>
        </div>

        {/* Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {latest.map((l) => (
            <div
              key={l._id}
              className="group border border-base-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-base-100 flex flex-col hover:-translate-y-2"
            >
              {/* Image Wrapper */}
              <div className="relative h-52 overflow-hidden bg-neutral/5">
                <img
                  src={l.imageUrl}
                  alt={l.ticketTitle}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="badge badge-accent font-bold py-3 px-4 shadow-lg">
                    {l.transportType}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 grow flex flex-col">
                <h3 className="text-lg font-extrabold text-base-content mb-3 leading-tight group-hover:text-primary transition-colors">
                  {l.ticketTitle}
                </h3>
                
                <div className="space-y-2 text-sm text-secondary mb-6">
                  <div className="flex justify-between items-center border-b border-base-200 pb-1">
                    <span className="opacity-70">Route:</span>
                    <span className="font-bold text-base-content">
                      {l.fromLocation} → {l.toLocation}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-b border-base-200 pb-1">
                    <span className="opacity-70">Departure:</span>
                    <span className="font-medium">
                      {l.departureDate}
                    </span>
                  </div>
                </div>

                {/* Perks Badge Row */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {l.perks && l.perks.slice(0, 2).map((perk, index) => (
                    <span key={index} className="text-[10px] uppercase tracking-widest font-bold bg-secondary/10 text-secondary px-2 py-1 rounded">
                      {perk}
                    </span>
                  ))}
                </div>

                {/* Pricing & Button */}
                <div className="mt-auto">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-xs font-bold text-accent uppercase">Price</p>
                      <span className="text-xl font-black text-primary">
                        {l.price} <small className="text-xs font-normal">TK</small>
                      </span>
                    </div>
                    <p className="text-xs font-medium text-secondary italic">
                      {l.quantity} seats left
                    </p>
                  </div>
                  
                  <Link
                    to={`/all-tickets/${l._id}`}
                    className="btn btn-primary w-full rounded-xl shadow-lg shadow-primary/20 group-hover:btn-accent border-none transition-all duration-300"
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