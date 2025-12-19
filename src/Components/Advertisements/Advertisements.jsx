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
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Featured Deals
          </h2>
          <p className="text-gray-500 mt-2">
            Check out our top-rated travel routes currently on promotion
          </p>
        </div>

      <Marquee pauseOnClick pauseOnHover speed={30}>
          <div className="flex">
          {ads.map((ad) => (
            <div
              key={ad._id}
              className="w-[350px]flex mx-4 border rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-50 flex flex-col"
            >
              <div className="relative h-48 overflow-hidden r">
                <img
                  src={ad.imageUrl}
                  alt={ad.ticketTitle}
                  className="w-100 h-60 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-sky-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                  {ad.transportType}
                </div>
              </div>

              <div className="p-6 grow flex flex-col">
                <h3 className="text-xl text-center font-bold text-gray-800 mb-2">
                  {ad.ticketTitle}
                </h3>
                <div className="text-sm text-gray-600 mb-4 ">
                  <p className="flex justify-between border-b py-1">
                    <span>Route:</span>
                    <span className="font-medium text-black">
                      {ad.fromLocation} → {ad.toLocation}
                    </span>
                  </p>
                  <p className="flex justify-between border-b py-1">
                    <span>Departure:</span>
                    <span className="text-black">
                      {ad.departureDate} at {ad.departureTime}
                    </span>
                  </p>
                </div>
                <div className=" mt-2  ">
                  {ad.perks && ad.perks.length > 0 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2">
                        Included Perks:
                      </h2>
                      <ul className="list-disc list-inside space-y-1">
                        {ad.perks.map((perk, index) => (
                          <li key={index}>{perk}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <div>
                    <span className="font-bold text-gray-600">
                      {ad.price} TK (per person)
                    </span>
                    <p className="  text-sky-600">
                      Available seats: {ad.quantity}
                    </p>
                  </div>
                  <Link
                    to={`/all-tickets/${ad._id}`}
                    className="bg-sky-800 text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition-colors font-medium"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Marquee>
      </div>
    </div>
  );
};

export default Advertisements;
