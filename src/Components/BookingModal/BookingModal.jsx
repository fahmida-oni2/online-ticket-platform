import React, { use, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import toast from 'react-hot-toast';
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const BookingModal = ({ ticket, onClose }) => {
    const { user } = use(AuthContext);
    const [quantity, setQuantity] = useState(1);
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const isQuantityInvalid = quantity > ticket.quantity || quantity <= 0;

    const bookTicketMutation = useMutation({
        mutationFn: (bookingData) => {
            return axiosSecure.post('/bookings', bookingData); 
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['myBookedTickets'] }); 
            toast.success('Ticket booked successfully! Status: Pending');
            onClose();
        },
        onError: (error) => {
            console.error(error);
            toast.error('Booking failed. Please try again.');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        

        if (isQuantityInvalid) {
            toast.error(`Invalid quantity. Must be between 1 and ${ticket.quantity}.`);
            return;
        }

        const bookingData = {
            ticketId: ticket._id,
            image:ticket.imageUrl,
            ticketTitle: ticket.ticketTitle,
            vendorEmail: ticket.vendorEmail,
            bookedBy: user.email,
            fromLocation:ticket.fromLocation,
            toLocation:ticket.toLocation,
            transportType:ticket.transportType,
            bookingQuantity: quantity,
            unitPrice: parseFloat(ticket.price),
            bookingStatus: 'Pending', 
            departureDate:ticket.departureDate,
            departureTime:ticket.departureTime,
            bookingDate: new Date().toISOString(),
        };

        bookTicketMutation.mutate(bookingData);
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-xl font-bold mb-4">Book: {ticket.ticketTitle}</h3>
                <p className="text-sm mb-4">Available Seats: {ticket.quantity}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label htmlFor="quantity" className="text-sm font-medium">
                            Quantity to Book
                        </label>
                        <input
                            type="number"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                            min="1"
                            max={ticket.quantity}
                            required
                            className="border p-2 rounded"
                            disabled={bookTicketMutation.isPending}
                        />
                        {quantity > ticket.quantity && (
                            <p className="text-red-500 text-xs mt-1">Cannot exceed available seats ({ticket.quantity}).</p>
                        )}
                    </div>
                   

                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="btn bg-gray-300 text-gray-800 p-2 rounded"
                            disabled={bookTicketMutation.isPending}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="btn bg-green-600 text-white p-2 rounded hover:bg-green-700"
                            disabled={bookTicketMutation.isPending || isQuantityInvalid}
                        >
                            {bookTicketMutation.isPending ? 'Processing...' : 'Book Now'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingModal;