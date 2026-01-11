import React, { use } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Table from '../../../Components/Table/Table';
import { AuthContext } from '../../../Provider/AuthProvider';
import Loading from '../../../Components/Loading/Loading';
import { RiAdvertisementFill, RiInformationLine } from "react-icons/ri";

const AdvertiseTickets = () => {
    const { user } = use(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: ticketsResponse, refetch } = useQuery({
        queryKey: ["approved-tickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved-tickets');
            return res.data;
        },
        enabled: !!user?.email
    });

    const tickets = ticketsResponse?.data || [];
    const advertisedCount = tickets.filter(t => t.isAdvertised === true).length;

    const handleAdvertise = async (id, currentStatus) => {
        if (!currentStatus && advertisedCount >= 6) {
            return Swal.fire({
                icon: 'warning',
                title: 'Limit Reached',
                text: 'The homepage banner only supports 6 slots for optimal performance.',
                confirmButtonColor: '#0F172A',
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
                    text: `Ticket visibility has been updated.`,
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
        <div className="animate__animated animate__fadeIn">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
                        <RiAdvertisementFill className="text-accent" /> Ad <span className="text-accent">Promotions</span>
                    </h1>
                    <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1 flex items-center gap-1">
                        <RiInformationLine className="text-accent" /> Select up to 6 tickets for the homepage spotlight
                    </p>
                </div>
                
                {/* Slot Usage Tracker */}
                <div className="bg-primary px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 flex flex-col items-center md:items-end">
                    <span className="text-[9px] font-black text-white/60 uppercase tracking-widest">Active Slots</span>
                    <div className="flex items-baseline gap-1">
                        <span className={`text-xl font-black tracking-tight ${advertisedCount >= 6 ? 'text-red-400' : 'text-accent'}`}>
                            {advertisedCount}
                        </span>
                        <span className="text-white/40 text-xs font-bold">/ 6</span>
                    </div>
                </div>
            </div>

            {/* Table Container */}
            <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-white shadow-sm">
                <div className="overflow-x-auto">
                    <table className="table w-full border-collapse">
                        {/* Custom Themed Head */}
                        <thead className="bg-primary text-white uppercase text-[10px] font-black tracking-widest">
                            <tr>
                                <th className="py-5 pl-8">#</th>
                                <th>Ticket Title</th>
                                <th>Category</th>
                                <th>Route Details</th>
                                <th>Pricing</th>
                                <th>Inventory</th>
                                <th>Ad Status</th>
                                <th className="pr-8 text-center">Toggle Action</th>
                            </tr>
                        </thead>
                        <tbody className="font-bold text-primary">
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
                                    <td colSpan="8" className="text-center py-20 text-secondary opacity-50 uppercase text-xs tracking-widest">
                                        No approved tickets available for promotion.
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