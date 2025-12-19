import React, { use, useState } from "react"; // Changed 'use' to 'useContext'
import { AuthContext } from "../../Provider/AuthProvider";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../Components/Card/Card";
import { useLoaderData } from "react-router";
import Loading from "../../Components/Loading/Loading";

const Tickets = () => {
  const axiosSecure = useAxiosSecure();
  const [fromLocation, setFrom] = useState("");
  const [toLocation, setTo] = useState("");
  const [transportType, setType] = useState("All");
  const [sort, setSort] = useState("");
  const serviceArea = useLoaderData() || [];

  const { isPending, data: ticketsResponse } = useQuery({
    queryKey: [
      "approved-tickets",
     fromLocation, 
      toLocation,
      transportType,
      sort,
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-tickets`, {
        params: {
          from: fromLocation,
          to: toLocation,
          type: transportType,
          sort: sort,
        },
      });
      return res.data;
    },
  });

  if (isPending) {
    return <Loading />;
  }
  const tickets = ticketsResponse?.data || [];
 const cities = [...new Set(serviceArea.map((c) => c.city_name))];

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-center font-bold text-3xl mt-5 mb-8 text-sky-800 ">
          All Approved Tickets
        </h1>
        <div className="bg-sky-50 p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="form-control">
          <label className="label-text font-semibold mb-2">From</label>
          <select
            value={fromLocation}
            className="select select-bordered w-full"
            onChange={(e) => setFrom(e.target.value)}
          >
            <option value="">All Locations</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2">To</label>
          <select
            className="select select-bordered w-full"
            value={toLocation}
            onChange={(e) => setTo(e.target.value)}
          >
            <option value="">All Locations</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2">Transport Type</label>
          <select
            className="select select-bordered w-full"
            value={transportType}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Flight">Flight</option>
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2">Sort By Price</label>
          <select
            className="select select-bordered w-full"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>
        </div>
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-400 font-medium">
              No tickets match your search criteria.
            </p>
            <button
              onClick={() => {
                setFrom("");
                setTo("");
                setType("All");
                setSort("");
              }}
              className="btn rounded-2xl text-white bg-sky-800  mt-2"
            >
              Clear All Filters
            </button>
          </div>
        )}
 
    </>
  );
};

export default Tickets;
