import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";
import Marquee from "react-fast-marquee";

const Advertisements = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: ads = [] } = useQuery({
    queryKey: ["advertisements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/advertisements");
      return res.data;
    },
  });

  if (isPending) return <Loading />;
  if (ads.length === 0) return null;

  return (
    <section className="py-16 bg-base-100 text-base-content">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-primary tracking-tight">
            Featured Advertisements
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mt-4 rounded-full"></div>
          <p className="text-secondary font-medium mt-4 max-w-lg mx-auto">
            Check out our top-rated travel routes currently on promotion
          </p>
        </div>

        {/* Marquee Wrapper */}
        <Marquee pauseOnClick pauseOnHover speed={40} gradient={false}>
          <div className="flex py-4">
            {ads.map((ad) => (
              <div
                key={ad._id}
                className="w-[380px] mx-6 border border-base-200 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-base-100 group flex flex-col"
              >
                {/* Image Section */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={ad.imageUrl}
                    alt={ad.ticketTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                
                  <div className="absolute top-4 right-4 bg-accent text-accent-content px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg">
                    {ad.transportType}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 grow flex flex-col">
                  <h3 className="text-xl font-bold text-neutral mb-3 group-hover:text-primary transition-colors">
                    {ad.ticketTitle}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between items-center border-b border-base-200 pb-2">
                      <span className="text-sm font-semibold text-secondary/70">Route</span>
                      <span className="font-bold text-neutral">
                        {ad.fromLocation} → {ad.toLocation}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b border-base-200 pb-2">
                      <span className="text-sm font-semibold text-secondary/70">Departure</span>
                      <span className="text-sm font-medium">
                        {ad.departureDate} | {ad.departureTime}
                      </span>
                    </div>
                  </div>

                  {/* Perks Section */}
                  {ad.perks && ad.perks.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-bold text-primary uppercase mb-2">Included Perks:</h4>
                      <ul className="grid grid-cols-2 gap-1">
                        {ad.perks.slice(0, 4).map((perk, index) => (
                          <li key={index} className="text-xs flex items-center gap-1 text-secondary">
                            <span className="text-accent">✦</span> {perk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                
                  <div className="mt-auto pt-4 flex justify-between items-center border-t border-base-200">
                    <div>
                      <span className="block text-2xl font-black text-primary">
                        {ad.price} <small className="text-xs font-normal">TK</small>
                      </span>
                      <p className="text-xs font-bold text-accent">
                        {ad.quantity} seats left
                      </p>
                    </div>
                    <Link
                      to={`/all-tickets/${ad._id}`}
                      className="btn btn-primary btn-sm md:btn-md rounded-xl hover:btn-accent border-none shadow-md"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
};

export default Advertisements;