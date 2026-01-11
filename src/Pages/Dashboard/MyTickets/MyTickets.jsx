import React, { use } from 'react';
import { Link } from 'react-router'; 
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';
import BookingCard from '../../../Components/BookingCard/BookingCard';
import { FaTicketAlt, FaInbox } from 'react-icons/fa';

const MyTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const { isPending, data: bookings = [] } = useQuery({
    queryKey: ['my-bookings', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-bookings?email=${user.email}`);
      return res.data;
    },
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
        title: "Cancelled!",
        text: "Your booking has been removed successfully.",
        icon: "success",
        confirmButtonColor: "#0F172A", 
      });
    },
    onError: (error) => {
      toast.error("Failed to cancel booking.");
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Cancel Booking?",
      text: "This will release your reserved seat. This action is permanent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", 
      cancelButtonColor: "#0F172A", 
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "Keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTicketMutation.mutate(id);
      }
    });
  };

  if (isPending) return <Loading />;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-base-200">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaTicketAlt className="text-accent" /> My <span className="text-accent">Tickets</span> 
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Manage your active reservations and journey history
          </p>
        </div>
        
        {/* Quick Stats badge */}
        <div className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 self-start md:self-center">
            <span className="text-[10px] font-black text-primary uppercase">Total Reservations: </span>
            <span className="text-lg font-black text-accent">{bookings.length}</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div>
        {bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-[2rem] border-2 border-dashed border-base-300">
            <div className="bg-white p-6 rounded-full shadow-xl mb-4 text-primary/20">
              <FaInbox size={50} />
            </div>
            <h3 className="text-xl font-black text-primary uppercase tracking-tight">No Active Bookings</h3>
            <p className="text-secondary font-medium mb-8">You haven't reserved any journeys yet.</p>
            <Link 
              to="/tickets" 
              className="px-8 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:scale-105 transition-all shadow-lg shadow-primary/20"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {bookings.map((ticket) => (
              <BookingCard 
                key={ticket._id} 
                ticket={ticket} 
                onDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>

      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default MyTickets;