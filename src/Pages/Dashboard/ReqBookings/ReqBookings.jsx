import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Loading/Loading";
import { FaInbox, FaCheckCircle, FaTimesCircle, FaUserCircle } from "react-icons/fa";

const ReqBookings = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const {
    data: requestedBookings = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["vendorBookings", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/vendor/bookings`);
      return res.data;
    },
  });

  const handleStatusUpdate = (id, status, title) => {
    axiosSecure.patch(`/bookings/status/${id}`, { status }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `Booking ${status.toUpperCase()}!`,
          text: `Update successful for ${title}`,
          confirmButtonColor: "#0F172A", 
          timer: 1500,
        });
      }
    });
  };

  if (isLoading) return <Loading />;


  const pendingCount = requestedBookings.filter(b => b.status === "pending" || !b.status).length;

  return (
    <div className="animate__animated animate__fadeIn pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaInbox className="text-accent" /> Booking <span className="text-accent">Req.</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Review and manage incoming travel reservations
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="bg-amber-100 px-4 py-2 rounded-xl border border-amber-200 animate-pulse">
             <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">
               {pendingCount} Action Required
             </span>
          </div>
        )}
      </div>

      <div className="bg-white rounded-[2rem] border border-base-300 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-4">
            <thead>
              <tr className="text-secondary uppercase text-[10px] font-black tracking-[0.15em] border-none">
                <th className="bg-transparent">Customer</th>
                <th className="bg-transparent">Journey Details</th>
                <th className="bg-transparent text-center">Seats</th>
                <th className="bg-transparent text-right">Revenue</th>
                <th className="bg-transparent text-center">Status</th>
                <th className="bg-transparent text-right">Decision</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {requestedBookings.map((booking) => (
                <tr key={booking._id} className="group hover:bg-base-100 transition-colors">
                  <td className="rounded-l-2xl border-y border-l border-base-200 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-accent bg-accent/10 p-2 rounded-full hidden sm:block">
                        <FaUserCircle size={20} />
                      </div>
                      <div>
                        <div className="font-black text-primary text-sm uppercase">
                          {booking.bookedBy || "Anonymous"}
                        </div>
                        <div className="text-[10px] font-bold text-secondary tracking-tight">
                          {booking.customerEmail}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="border-y border-base-200 py-4">
                    <div className="font-bold text-primary text-xs uppercase tracking-tight">
                      {booking.ticketTitle}
                    </div>
                  </td>

                  <td className="border-y border-base-200 text-center py-4">
                    <span className="bg-base-200 text-primary px-3 py-1 rounded-lg font-black text-xs">
                      {booking.bookingQuantity}
                    </span>
                  </td>

                  <td className="border-y border-base-200 text-right py-4">
                    <div className="font-black text-green-600 text-sm">
                      TK {(parseFloat(booking.unitPrice || 0) * parseInt(booking.bookingQuantity)).toLocaleString()}
                    </div>
                  </td>

                  <td className="border-y border-base-200 text-center py-4">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${
                      booking.status === "accepted" ? "bg-green-100 text-green-700" :
                      booking.status === "rejected" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {booking.status || "pending"}
                    </span>
                  </td>

                  <td className="rounded-r-2xl border-y border-r border-base-200 text-right py-4">
                    {!booking.status || booking.status === "pending" ? (
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleStatusUpdate(booking._id, "accepted", booking.ticketTitle)}
                          className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors group/btn"
                          title="Accept Booking"
                        >
                          <FaCheckCircle size={22} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, "rejected", booking.ticketTitle)}
                          className="p-2 text-red-400 hover:bg-red-50 rounded-lg transition-colors group/btn"
                          title="Reject Booking"
                        >
                          <FaTimesCircle size={22} className="group-hover/btn:scale-110 transition-transform" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-[9px] font-bold uppercase text-secondary/40 italic">
                        Finalized
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {requestedBookings.length === 0 && (
            <div className="text-center py-20 flex flex-col items-center">
              <FaInbox size={40} className="text-base-300 mb-4" />
              <p className="text-secondary font-black uppercase text-xs tracking-[0.2em]">No pending requests</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReqBookings;