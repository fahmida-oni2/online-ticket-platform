import React, { use } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../Provider/AuthProvider';
import Loading from '../../../components/Loading/Loading';

const ReqBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext);

    const { data: requestedBookings = [], refetch, isLoading } = useQuery({
        queryKey: ['vendorBookings', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/vendor/bookings`);
            return res.data;
        }
    });

    const handleStatusUpdate = (id, status, title) => {
        axiosSecure.patch(`/bookings/status/${id}`, { status })
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        icon: 'success',
                        title: `Booking ${status}!`,
                        text: `You have ${status} the booking for ${title}`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            });
    };

    if (isLoading) return <Loading></Loading>;

    return (
        <div className="p-6">
            <h2 className="text-3xl font-semibold mb-6">Requested Bookings</h2>
            <div className="overflow-x-auto shadow-xl rounded-box">
                <table className="table w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>User Details</th>
                            <th>Ticket Title</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Current Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requestedBookings.map((booking) => (
                            <tr key={booking._id}>
                                <td>
                                    <div className="font-bold">{booking.userName || 'Anonymous'}</div>
                                    <div className="text-sm opacity-50">{booking.bookedBy}</div>
                                </td>
                                <td>{booking.ticketTitle}</td>
                                <td>{booking.bookingQuantity}</td>
                                <td className="font-medium text-green-600">
                                    ${(parseFloat(booking.unitPrice || 0) * parseInt(booking.bookingQuantity)).toFixed(2)}
                                </td>
                                <td>
                                    <span className={`badge badge-sm ${
                                        booking.status === 'accepted' ? 'badge-success' : 
                                        booking.status === 'rejected' ? 'badge-error' : 'badge-warning'
                                    }`}>
                                        {booking.status || 'pending'}
                                    </span>
                                </td>
                                <td className="flex gap-2">
                                    {booking.status !== 'accepted' && booking.status !== 'rejected' ? (
                                        <>
                                            <button 
                                                onClick={() => handleStatusUpdate(booking._id, 'accepted', booking.ticketTitle)}
                                                className="btn btn-success btn-xs text-white"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => handleStatusUpdate(booking._id, 'rejected', booking.ticketTitle)}
                                                className="btn btn-error btn-xs text-white"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <span className="text-xs italic text-gray-400">Processed</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {requestedBookings.length === 0 && (
                    <div className="text-center py-10 text-gray-500">No booking requests found.</div>
                )}
            </div>
        </div>
    );
};

export default ReqBookings;