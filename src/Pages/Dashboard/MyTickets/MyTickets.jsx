import React, { use, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';
import BookingCard from '../../../Components/BookingCard/BookingCard';

const MyTickets = () => {
    const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
     const {isPending,data:bookings } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}`);
      return res.data;
    } ,
    enabled: !!user?.email,

  });
   
 const deleteTicketMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/bookings/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my-bookings'] }); 
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

if (isPending) {
    return <Loading></Loading>;
  }
    return (
        <div>
            <div className="pt-10">
          <h1 className=" text-3xl font-bold text-center py-2">
            Your Booking Tickets
          </h1>
          <p className="text-[#627382] text-center">
            View and manage the tickets you are booking.
          </p>
        </div>
            <div className="">
        {bookings.length === 0 ? (
          <p className="text-center">No tickets found for your account.</p>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-3 ">
            {bookings.map((ticket) => (
              <BookingCard key={ticket._id} ticket={ticket} onDelete={handleDelete}></BookingCard>
            ))}
          </div>
       
        )}
      </div>
        
        <Toaster></Toaster>
        </div>
    );
};

export default MyTickets;