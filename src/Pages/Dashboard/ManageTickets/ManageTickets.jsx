import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
const ManageTickets = () => {
  const axiosSecure = useAxiosSecure();
  const { refetch, data: vendor = [] } = useQuery({
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
            position: "top-end",
            icon: "success",
            title: `Vendor status is set to ${status}.`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
      })
      .catch((err) => {
        // console.error(err);
        Swal.fire("Error", "Could not update status", "error");
      });
  };
  const handleApproval = (vendor) => {
    updateVendorStatus(vendor, "approved");
  };

  const handleRejection = (vendor) => {
    updateVendorStatus(vendor, "rejected");
  };
  return (
    <div>
      <h2 className="text-4xl text-center text-sky-800 mb-5 mt-5">Vendors Pending Approval: {vendor.length} </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
         
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>TicketTitle</th>
              <th>Verification Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendor.map((vendor, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{vendor.vendorName}</td>
                <td>{vendor.vendorEmail}</td>
                <td>{vendor.ticketTitle}</td>
                <td>
                  <p
                    className={`${
                      vendor.status === "approved"
                        ? "text-green-800"
                        : "text-red-500"
                    }`}
                  >
                    {vendor.status}
                  </p>
                </td>
                <td>
                  <button
                    onClick={() => handleApproval(vendor)}
                    className="btn"
                  >
                    <FaUserCheck />
                  </button>
                  <button
                    onClick={() => handleRejection(vendor)}
                    className="btn"
                  >
                    <IoPersonRemoveSharp />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTickets;
