import React, { useContext } from 'react'; // Changed 'use' to 'useContext'
import { AuthContext } from '../../Provider/AuthProvider';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Card from '../../Components/Card/Card';
import Loading from '../../components/Loading/Loading';

const Tickets = () => {
    const { user } = useContext(AuthContext); 
    const axiosSecure = useAxiosSecure();

    const { isPending, data: ticketsResponse } = useQuery({
        queryKey: ["approved-tickets", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get('/approved-tickets');
            return res.data;
        },
    });

    if (isPending) {
        return <Loading />;
    }
    const tickets = ticketsResponse?.data || [];

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-center font-bold text-3xl mt-5 mb-8">All Approved Tickets</h1>
            
            {tickets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tickets.map((ticket) => (
                        <Card 
                            key={ticket._id} 
                            ticket={ticket} 
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 mt-10">No tickets available at the moment.</p>
            )}
        </div>
    );
};

export default Tickets;