import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Card from "../../Components/Card/Card";
import { useLoaderData } from "react-router";
import { motion } from "framer-motion";
import { FaFilter, FaSortAmountDown, FaBus, FaTrain, FaPlane } from "react-icons/fa";
import SkeletonCard from "../../Components/SkeletonCard/SkeletonCard";

const Tickets = () => {
  const axiosSecure = useAxiosSecure();
  const [fromLocation, setFrom] = useState("");
  const [toLocation, setTo] = useState("");
  const [transportType, setType] = useState("All");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const itemsPerPage = 8; 
  const serviceArea = useLoaderData() || [];

  const { isPending, isFetching, data: ticketsResponse } = useQuery({
    queryKey: ["approved-tickets", fromLocation, toLocation, transportType, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-tickets`, {
        params: {
          from: fromLocation,
          to: toLocation,
          type: transportType,
          sort: sort,
          page: page - 1,
          size: itemsPerPage,
        },
      });
      return res.data;
    },
  });

  const tickets = ticketsResponse?.data || [];
  const totalCount = ticketsResponse?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  
  const cities = [...new Set(serviceArea.map((c) => c.city_name))];

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1);
  };

  if (isPending) return <SkeletonCard></SkeletonCard>;

  return (
    <div className="min-h-screen bg-base-200/50 pb-20">
      {/* Header Section */}
      <div className="bg-primary pt-16 pb-24 px-4 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl lg:text-5xl font-black text-white uppercase tracking-tighter mb-4"
        >
          Find Your <span className="text-accent">Perfect Ticket</span>
        </motion.h1>
        <p className="text-white/70 font-medium max-w-2xl mx-auto italic">
          Browse through verified routes and secure your seats instantly.
        </p>
      </div>

      <div className="container mx-auto px-4 -mt-12">
       
        <div className="bg-base-100 p-6 lg:p-8 rounded-[2rem] shadow-2xl border border-base-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaFilter className="text-accent" /> Departure
            </label>
            <select
              value={fromLocation}
              className="select select-bordered w-full rounded-xl font-bold bg-base-200 border-none focus:ring-2 focus:ring-accent"
              onChange={(e) => handleFilterChange(setFrom, e.target.value)}
            >
              <option value="">All Locations</option>
              {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaFilter className="text-accent" /> Destination
            </label>
            <select
              className="select select-bordered w-full rounded-xl font-bold bg-base-200 border-none focus:ring-2 focus:ring-accent"
              value={toLocation}
              onChange={(e) => handleFilterChange(setTo, e.target.value)}
            >
              <option value="">All Locations</option>
              {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaBus className="text-accent" /> Category
            </label>
            <select
              className="select select-bordered w-full rounded-xl font-bold bg-base-200 border-none focus:ring-2 focus:ring-accent"
              value={transportType}
              onChange={(e) => handleFilterChange(setType, e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Bus">Bus Service</option>
              <option value="Train">Railway</option>
              <option value="Flight">Air Travel</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1 flex items-center gap-2">
              <FaSortAmountDown className="text-accent" /> Sort By
            </label>
            <select
              className="select select-bordered w-full rounded-xl font-bold bg-base-200 border-none focus:ring-2 focus:ring-accent"
              value={sort}
              onChange={(e) => handleFilterChange(setSort, e.target.value)}
            >
              <option value="">Default Listing</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Results Section */}
        <div className="mt-12">
          {tickets.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {tickets.map((ticket) => (
                  <Card key={ticket._id} ticket={ticket} />
                ))}
              </div>

              {/* Theme-Consistent Pagination */}
              <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-4 rounded-2xl shadow-lg border border-base-200">
                <p className="text-[10px] font-black text-primary uppercase tracking-widest">
                  Showing Page <span className="text-accent">{page}</span> of {totalPages}
                </p>

                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-base-200 text-primary disabled:opacity-30"
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </button>
                  
                  <button
                    className="px-6 py-2 rounded-lg font-black text-[10px] uppercase tracking-widest transition-all bg-primary text-white shadow-lg shadow-primary/20 disabled:opacity-30"
                    disabled={page >= totalPages || isFetching}
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-20 bg-white rounded-[2.5rem] shadow-xl border border-dashed border-base-300">
              <div className="bg-base-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <FaFilter size={30} className="text-primary/20" />
              </div>
              <h3 className="text-2xl font-black text-primary uppercase tracking-tight">No Tickets Found</h3>
              <p className="text-secondary font-medium mb-8">Try adjusting your filters or search criteria.</p>
              <button
                onClick={() => {
                  setFrom("");
                  setTo("");
                  setType("All");
                  setSort("");
                }}
                className="px-8 py-4 bg-accent text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-transform"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tickets;