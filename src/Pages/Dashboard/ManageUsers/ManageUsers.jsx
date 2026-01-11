import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaSkullCrossbones, FaStore, FaUserShield, FaUsersCog, FaBan } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import Loading from "../../../Components/Loading/Loading";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: users = [], isPending } = useQuery({
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
          title: "Role Updated",
          text: `${user.name} elevated to ${role}`,
          showConfirmButton: false,
          timer: 1500,
          confirmButtonColor: "#0F172A",
        });
      }
    });
  };

  const handleMarkAsFraud = (user) => {
    Swal.fire({
      title: "Blacklist Vendor?",
      text: `Marking ${user.name} as fraud will hide all their tickets forever!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#0F172A",
      confirmButtonText: "Yes, Mark as Fraud",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/fraud/${user._id}`).then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Blacklisted!", "Vendor marked as fraud and tickets hidden.", "success");
          }
        });
      }
    });
  };

  if (isPending) return <Loading />;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaUsersCog className="text-accent" /> Manage <span className="text-accent">User</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Control user permissions, roles, and platform integrity
          </p>
        </div>
        
        <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10">
            <span className="text-[10px] font-black text-primary uppercase">Total Registered: </span>
            <span className="text-lg font-black text-accent">{users.length}</span>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-primary text-white uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">#</th>
                <th>Identity</th>
                <th>Email</th>
                <th>Role Badge</th>
                <th>Permission Actions</th>
                <th className="pr-8">Integrity Status</th>
              </tr>
            </thead>
            <tbody className="font-bold text-primary">
              {users.map((user, index) => (
                <tr key={user._id} className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none">
                  <td className="pl-8 text-secondary font-medium">{index + 1}</td>
                  <td>
                    <div className="font-black uppercase text-xs tracking-tight">{user.name}</div>
                  </td>
                  <td className="text-xs lowercase text-secondary font-medium">{user.email}</td>
                  <td>
                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      user.role === 'admin' ? 'bg-accent/20 text-accent' : 
                      user.role === 'vendor' ? 'bg-purple-100 text-purple-700' : 'bg-base-200 text-secondary'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      {user.role !== "admin" ? (
                        <button
                          onClick={() => handleUpdateRole(user, "admin")}
                          className="btn btn-xs bg-primary text-white border-none hover:bg-accent transition-all"
                          title="Promote to Admin"
                        >
                          <FaUserShield size={12} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleUpdateRole(user, "user")}
                          className="btn btn-xs bg-amber-400 text-white border-none"
                          title="Demote to User"
                        >
                          <IoPersonRemoveSharp size={12} />
                        </button>
                      )}

                      {user.role !== "vendor" && (
                        <button
                          onClick={() => handleUpdateRole(user, "vendor")}
                          className="btn btn-xs bg-accent text-white border-none hover:bg-primary"
                          title="Promote to Vendor"
                        >
                          <FaStore size={12} />
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="pr-8">
                    {user.role === "vendor" && user.status !== "fraud" ? (
                      <button
                        onClick={() => handleMarkAsFraud(user)}
                        className="btn btn-xs btn-outline btn-error font-black text-[9px] uppercase tracking-tighter"
                      >
                        <FaSkullCrossbones className="mr-1" /> Flag Fraud
                      </button>
                    ) : user.status === "fraud" ? (
                      <div className="flex items-center gap-1 text-red-600 animate-pulse">
                        <FaBan /> <span className="text-[10px] font-black uppercase">Blacklisted</span>
                      </div>
                    ) : (
                      <span className="text-secondary opacity-30 text-[10px] font-black uppercase italic">Secured</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;