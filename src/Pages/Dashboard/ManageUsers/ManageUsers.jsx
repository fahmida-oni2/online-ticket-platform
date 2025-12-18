import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSkullCrossbones, FaStore, FaUserShield } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleUpdateRole = (user, role) => {
    axiosSecure.patch(`/users/${user._id}/role`, { role }).then((res) => {
      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${user.name} is now a ${role}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleMarkAsFraud = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Marking ${user.name} as fraud will hide all their tickets forever!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Mark as Fraud",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire(
              "Success!",
              "Vendor marked as fraud and tickets hidden.",
              "success"
            );
          }
        });
      }
    });
  };

  return (
    <div>
      <h2 className="text-4xl text-center mt-5 mb-5">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <div className="flex gap-2">
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleUpdateRole(user, "admin")}
                        className="btn btn-sm bg-green-400 text-white"
                        title="Make Admin"
                      >
                        <FaUserShield />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUpdateRole(user, "user")}
                        className="btn btn-sm bg-orange-300"
                        title="Remove Admin"
                      >
                        <IoPersonRemoveSharp />
                      </button>
                    )}

                    {user.role !== "vendor" && (
                      <button
                        onClick={() => handleUpdateRole(user, "vendor")}
                        className="btn btn-sm bg-blue-400 text-white"
                        title="Make Vendor"
                      >
                        <FaStore />
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  {user.role === "vendor" && user.status !== "fraud" ? (
                    <button
                      onClick={() => handleMarkAsFraud(user)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaSkullCrossbones className="mr-1" /> Mark Fraud
                    </button>
                  ) : user.status === "fraud" ? (
                    <span className="text-red-600 font-bold">Blacklisted</span>
                  ) : (
                    <span className="text-gray-400 italic">N/A</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
