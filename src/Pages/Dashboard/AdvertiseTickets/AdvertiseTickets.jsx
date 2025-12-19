import React, { use } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../components/Loading/Loading';
import Swal from 'sweetalert2';
import Table from '../../../Components/Table/Table';
import { AuthContext } from '../../../Provider/AuthProvider';

const AdvertiseTickets = () => {
    const { user } = use(AuthContext); 
    const axiosSecure = useAxiosSecure();

    const { isPending, data: ticketsResponse, refetch } = useQuery({
        queryKey: ["approved-tickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved-tickets');
            return res.data;
        },
    });

    const tickets = ticketsResponse?.data || [];

    const handleAdvertise = async (id, currentStatus) => {
        const advertisedCount = tickets.filter(t => t.isAdvertised === true).length;


        if (!currentStatus && advertisedCount >= 6) {
            return Swal.fire({
                icon: 'warning',
                title: 'Limit Reached',
                text: 'You can only advertise 6 tickets at a time.',
                confirmButtonColor: '#7c3aed'
            });
        }

        try {
            const res = await axiosSecure.patch(`/tickets/advertise/${id}`, { 
                isAdvertised: !currentStatus 
            });

            if (res.data.success) {
                refetch();
                Swal.fire({
                    icon: 'success',
                    title: `Success`,
                    text: `Ticket is now ${!currentStatus ? 'Advertised' : 'Unadvertised'}`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        } catch (error) {
            Swal.fire('Error', error.response?.data?.message || 'Update failed', 'error');
        }
    };

   

    if (isPending) return <Loading />;

    return (
        <div className="p-6 bg-gray-50 min-h-screen ">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Manage Advertisements</h1>
                    <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg font-bold">
                        Slot Usage: {tickets.filter(t => t.isAdvertised).length} / 6
                    </div>
                </div>
                
                <div className="bg-white shadow-xl rounded-2xl overflow-x-auto border border-gray-200">
                    <table className="min-w-full divide-y divide-gray-200 text-center">
                        <thead className="bg-gray-50 ">
                            <tr>
                                <th className="px-4 py-4 text-center text-xs font-semibold text-gray-500 uppercase">#</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Title</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Route</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Seats</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {tickets.length > 0 ? (
                                tickets.map((ticket, index) => (
                                    <Table 
                                        key={ticket._id} 
                                        index={index}
                                        ticket={ticket} 
                                        onAdvertise={handleAdvertise}
                                       
                                    />
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center py-20 text-gray-400">
                                        No approved tickets found in the page.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdvertiseTickets;