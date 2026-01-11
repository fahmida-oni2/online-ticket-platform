import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserCheck, FaUserTimes, FaShieldAlt } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: vendors = [], isPending } = useQuery({
    queryKey: ["vendor", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/vendor");
      return res.data;
    },
  });

  const updateVendorStatus = (vendor, status) => {
    const updateInfo = { status: status, email: vendor.vendorEmail };
    axiosSecure
      .patch(`/vendor/status/${vendor._id}`, updateInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          Swal.fire({
            title: "Status Updated",
            text: `Vendor is now ${status}`,
            icon: "success",
            confirmButtonColor: "#0F172A",
          });
        }
      })
      .catch(() => {
        Swal.fire("Error", "Could not update status", "error");
      });
  };

  if (isPending) return <Loading />;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaShieldAlt className="text-accent" /> Manage <span className="text-accent">Vendor</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Review and verify incoming ticket vendor applications
          </p>
        </div>
        
        <div className="bg-accent/10 px-4 py-2 rounded-xl border border-accent/20">
            <span className="text-[10px] font-black text-primary uppercase">Pending Review: </span>
            <span className="text-lg font-black text-accent">{vendors.length}</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-primary text-white uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">#</th>
                <th>Vendor Details</th>
                <th>Ticket Title</th>
                <th>Status</th>
                <th className="pr-8 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="font-bold text-primary">
              {vendors.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-secondary opacity-50 uppercase text-xs tracking-widest">
                    No pending vendor requests found.
                  </td>
                </tr>
              ) : (
                vendors.map((vendor, index) => (
                  <tr key={vendor._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none">
                    <td className="pl-8 text-secondary font-medium">{index + 1}</td>
                    <td>
                      <div className="flex flex-col">
                        <span className="text-sm uppercase tracking-tight">{vendor.vendorName}</span>
                        <span className="text-[10px] text-secondary font-medium lowercase">{vendor.vendorEmail}</span>
                      </div>
                    </td>
                    <td className="text-xs uppercase tracking-tighter text-secondary">
                      {vendor.ticketTitle}
                    </td>
                    <td>
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm ${
                        vendor.status === "approved" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-amber-100 text-amber-700"
                      }`}>
                        {vendor.status}
                      </span>
                    </td>
                    <td className="pr-8">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => updateVendorStatus(vendor, "approved")}
                          className="btn btn-sm bg-green-600 hover:bg-green-700 border-none text-white rounded-lg shadow-md shadow-green-200"
                          title="Approve Vendor"
                        >
                          <FaUserCheck size={14} />
                        </button>
                        <button
                          onClick={() => updateVendorStatus(vendor, "rejected")}
                          className="btn btn-sm bg-red-500 hover:bg-red-600 border-none text-white rounded-lg shadow-md shadow-red-200"
                          title="Reject Vendor"
                        >
                          <FaUserTimes size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageTickets;