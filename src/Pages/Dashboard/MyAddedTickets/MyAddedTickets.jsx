import React, { use, useState} from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import VendorCard from "../../../Components/VendorCard/VendorCard";
import UpdateTicket from "../../UpdateTicket/UpdateTicket";
import { FaTicketAlt, FaLayerGroup } from "react-icons/fa";

const MyAddedTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  const { isPending, data: tickets = [], refetch } = useQuery({
    queryKey: ["my-tickets", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-tickets?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const deleteTicketMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/vendor/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-tickets'] }); 
      Swal.fire({
        title: "Removed!",
        text: "The ticket has been successfully deleted from your inventory.",
        icon: "success",
        confirmButtonColor: "#0F172A", 
      });
    },
    onError: () => {
      toast.error("Failed to delete ticket. Please try again.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Confirm Deletion?",
      text: "This ticket will be permanently removed from the marketplace.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#0F172A", 
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTicketMutation.mutate(id);
      }
    });
  };

  const handleEdit = (ticketData) => {
    setEditingTicket(ticketData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
  };

  if (isPending) return <Loading />;

  return (
    <div className="animate__animated animate__fadeIn pb-10">
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaLayerGroup className="text-accent" /> My <span className="text-accent">Inventory</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Manage your listed tickets, pricing, and availability
          </p>
        </div>
        
        <div className="bg-accent/10 px-5 py-3 rounded-2xl border border-accent/20 flex flex-col items-center md:items-end">
            <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em]">Total Listed</span>
            <div className="flex items-center gap-2">
                <FaTicketAlt className="text-accent text-xs" />
                <span className="text-xl font-black text-primary">{tickets.length}</span>
            </div>
        </div>
      </div>

      {/* Tickets Grid */}
      {tickets.length === 0 ? (
        <div className="text-center py-20 bg-base-100 rounded-[2rem] border-2 border-dashed border-base-300">
           <p className="text-secondary font-bold uppercase text-xs tracking-widest">You haven't added any tickets yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {tickets.map((ticket) => (
            <VendorCard 
              key={ticket._id} 
              ticket={ticket} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
            />
          ))}
        </div>
      )}

      {/* Edit Modal Overlay */}
      {isModalOpen && editingTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-[2.5rem] shadow-2xl animate__animated animate__zoomIn animate__faster">
             <UpdateTicket
                ticket={editingTicket}
                onClose={handleCloseModal}
                refetch={refetch}
              />
          </div>
        </div>
      )}
      
      <Toaster position="top-right" />
    </div>
  );
};

export default MyAddedTickets;