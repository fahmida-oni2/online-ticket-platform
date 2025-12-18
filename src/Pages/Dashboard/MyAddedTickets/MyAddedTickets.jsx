import React, { use, useState} from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Loading/Loading";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import VendorCard from "../../../Components/VendorCard/VendorCard";
import UpdateTicket from "../../UpdateTicket/UpdateTicket";

const MyAddedTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTicket, setEditingTicket] = useState(null);

 const { isPending, data: tickets,refetch = [] } = useQuery({
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
        title: "Deleted!",
        text: "Your ticket has been deleted and the list is updated.",
        icon: "success",
      });
    },

    onError: (error) => {
      toast.error("Error deleting ticket.");
    },
  });



    const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
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
  if (isPending) {
    return <Loading></Loading>;
  }
  return (
    <>
      <h1 className="text-center font-bold text-3xl mt-5">Your Tickets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {tickets.map((ticket) => {
    return (
      <VendorCard 
        key={ticket._id} 
        ticket={ticket} 
        onDelete={handleDelete} 
        onEdit={handleEdit} 
      />
    );
  })}
</div>

      {isModalOpen && editingTicket && (
                <UpdateTicket
                    ticket={editingTicket}
                    onClose={handleCloseModal}
                    refetch = {refetch}
                />
            )}
            <Toaster />
    </>
  );
};

export default MyAddedTickets;
