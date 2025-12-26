import React, {  useState } from "react";
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
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;
  const serviceArea = useLoaderData() || [];

  const { isPending,isFetching, data: ticketsResponse } = useQuery({
    queryKey: [
      "approved-tickets",
     fromLocation, 
      toLocation,
      transportType,
      sort,
     page
    ],
    queryFn: async () => {
      const res = await axiosSecure.get(`/approved-tickets`, {
        params: {
          from: fromLocation,
          to: toLocation,
          type: transportType,
          sort: sort,
          page: page - 1, 
          size: itemsPerPage
        },
      });
      return res.data;
    },
  });

 
  const tickets = ticketsResponse?.data || [];
  const totalCount = ticketsResponse?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / itemsPerPage);
 const getPaginationGroup = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };
  const pages = getPaginationGroup();
  const cities = [...new Set(serviceArea.map((c) => c.city_name))];

  const handleFilterChange = (setter, value) => {
    setter(value);
    setPage(1); 
  };
   if (isPending) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-center font-bold text-3xl mt-5 mb-8 text-sky-800 ">
          All Approved Tickets
        </h1>
        <div className="bg-sky-50 p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="form-control">
          <label className="label-text font-semibold mb-2 text-black">From</label>
          <select
            value={fromLocation}
            className="select select-bordered w-full"
            onChange={(e) => handleFilterChange(setFrom, e.target.value)}
          >
            <option value="">All Locations</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2 text-black">To</label>
          <select
            className="select select-bordered w-full"
            value={toLocation}
            onChange={(e) => handleFilterChange(setTo, e.target.value)}
          >
            <option value="">All Locations</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2 text-black">Transport Type</label>
          <select
            className="select select-bordered w-full"
            value={transportType}
           onChange={(e) => handleFilterChange(setType, e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="Train">Train</option>
            <option value="Bus">Bus</option>
            <option value="Flight">Flight</option>
          </select>
        </div>
          <div className="form-control">
          <label className="label-text font-semibold mb-2 text-black">Sort By Price</label>
          <select
            className="select select-bordered w-full"
            value={sort}
           onChange={(e) => handleFilterChange(setSort, e.target.value)}
          >
            <option value="">Default</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </div>
        </div>
        {tickets.length > 0 ? (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <Card key={ticket._id} ticket={ticket} />
            ))}
          </div>
          <div className="pb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-base-content/70">
              Page <span className="font-semibold">{page}</span> of{" "}
              <span className="font-semibold">{totalPages}</span>
            </p>

            <div className="join">
              <button
                className="btn btn-sm join-item"
                disabled={page <= 1 || isFetching}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                ← Prev
              </button>

              {pages.map((p, idx) =>
                p === "..." ? (
                  <button
                    key={`dots-${idx}`}
                    className="btn btn-sm join-item btn-ghost cursor-default"
                    disabled
                  >
                    ...
                  </button>
                ) : (
                  <button
                    key={p}
                    className={[
                      "btn btn-sm join-item",
                      p === page ? "bg-sky-800 text-white" : "btn-ghost",
                    ].join(" ")}
                    disabled={isFetching}
                    onClick={() => setPage(p)}
                  >
                    {p}
                  </button>
                )
              )}

              <button
                className="btn btn-sm join-item"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next →
              </button>
            </div>
          </div>
          </>
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
