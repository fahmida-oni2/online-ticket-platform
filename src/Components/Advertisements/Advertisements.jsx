import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../Loading/Loading';

const Advertisements = () => {
    const axiosSecure = useAxiosSecure();
        const { isPending, data: ads =[] } = useQuery({
            queryKey: ["advertisements"],
            queryFn: async () => {
                const res = await axiosSecure.get('/advertisements');
                return res.data;
            },
        });
    

    if (isPending) return <Loading />;
    if (ads.length === 0) return null; 

    return (
        <div className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Featured Deals</h2>
                    <p className="text-gray-500 mt-2">Check out our top-rated travel routes currently on promotion</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ads.map((ad) => (
                        <div key={ad._id} className="group border pt-5 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-50 flex flex-col">
                           
                            <div className="relative h-48 overflow-hidden flex justify-center items-center">
                                <img 
                                    src={ad.imageUrl} 
                                    alt={ad.ticketTitle} 
                                    className="w-100 h-60 group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-sky-800 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                    {ad.transportType}
                                </div>
                            </div>

                          
                            <div className="p-6 grow flex flex-col">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">{ad.ticketTitle}</h3>
                                <div className="text-sm text-gray-600 mb-4 flex-grow">
                                    <p className="flex justify-between border-b py-1">
                                        <span>Route:</span>
                                        <span className="font-medium text-black">{ad.fromLocation} → {ad.toLocation}</span>
                                    </p>
                                    <p className="flex justify-between border-b py-1">
                                        <span>Departure:</span>
                                        <span className="text-black">{ad.departureDate} at {ad.departureTime}</span>
                                    </p>
                                </div>
                                
                                <div className="flex justify-between items-center mt-4">
                                    <div>
                                        <span className="text-2xl font-bold text-blue-600">{ad.price} TK</span>
                                        <p className="text-xs text-gray-400">per person</p>
                                    </div>
                                    <Link 
                                        to={`/all-tickets/${ad._id}`}
                                        className="bg-sky-800 text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition-colors font-medium"
                                    >
                                        Book Now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Advertisements;