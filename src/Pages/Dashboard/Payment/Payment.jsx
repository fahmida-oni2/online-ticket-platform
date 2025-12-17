import React from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Components/Loading/Loading';

const Payment = () => {
    const { ticketId } = useParams();
     const axiosSecure = useAxiosSecure();
       const { data: ticket, isPending } = useQuery({
    queryKey: ["ticketDetails", ticketId],

    queryFn: async () => {
      if (!ticketId) {
        toast.error("Ticket ID is missing.");
        return null;
      }

      const res = await axiosSecure.get(`/bookings/${ticketId}`);
      return res.data.result;
    },
    enabled: !!ticketId,
  });


 const finalPrice = ticket 
    ? (ticket.totalPrice || (Number(ticket.unitPrice) * Number(ticket.bookingQuantity))) 
    : 0;
  const handlePayment=async () =>{

  const paymentInfo = {
    cost: finalPrice,
    ticketId:ticket._id,
    bookedBy:ticket.bookedBy,
    ticketTitle:ticket.ticketTitle
  }
  const res = await axiosSecure.post('/create-checkout-session',paymentInfo)
  console.log(res.data)
  window.location.href = res.data.url;
  }

   if (isPending) {
    return <Loading></Loading>;
  }
    return (
        <div className='grid justify-center items-center mt-5'>
          Please pay {finalPrice} TK for : {ticket.ticketTitle} <br />
          <button onClick={handlePayment} className='btn mt-5 bg-sky-800 text-white rounded-2xl'>Pay</button>
             <Toaster></Toaster>
        </div>
       
    );
};

export default Payment;