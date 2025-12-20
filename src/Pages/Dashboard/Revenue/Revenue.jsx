import React, { use } from 'react';
import { AuthContext } from '../../../Provider/AuthProvider';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Components/Loading/Loading';
import { Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const Revenue = () => {
        const axiosSecure = useAxiosSecure();
      const {user}=use(AuthContext)
        const { isPending, data: revenue ={}} = useQuery({
            queryKey: ["revenue",user?.email],
            enabled: !!user?.email,
            queryFn: async () => {
                const res = await axiosSecure.get('/vendor/revenue');
                return res.data;
            },
        });
    if (isPending){
        return <Loading></Loading>
    }

    const chartData = [
        { name: 'Tickets Added', value: revenue?.totalTicketsAdded || 0, fill: 'blue' },
        { name: 'Tickets Sold', value: revenue?.totalTicketsSold || 0, fill: 'green' },
        { name: 'Total Revenue', value: revenue?.totalRevenue || 0, fill: 'red' },
    ];
    return (
        <div className="p-6 bg-white text-sky-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center text-sky-800">Revenue Overview  </h2>
            
            <div style={{ width: '100%', height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={chartData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                            formatter={(value, name, props) => {
                                if(props.payload.name === "Total Revenue") return [`TK ${value}`, "Amount"];
                                return [value, "Quantity"];
                            }}
                        />
                        <Legend />
                        <Bar dataKey="value" radius={[5, 5, 0, 0]}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                            <LabelList dataKey="value" position="top" />
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
                <div className="p-4 bg-sky-200  rounded-lg">
                    <p className="text-gray-500">Total Tickets Added</p>
                    <p className="text-xl font-bold">{revenue.totalTicketsAdded}</p>
                </div>
                <div className="p-4 bg-sky-200 rounded-lg">
                    <p className="text-gray-500">Total Tickets Sold</p>
                    <p className="text-xl font-bold">{revenue.totalTicketsSold}</p>
                </div>
                <div className="p-4 bg-sky-200 rounded-lg">
                    <p className="text-gray-500">Total Revenue</p>
                    <p className="text-xl font-bold text-orange-600">TK {revenue.totalRevenue}</p>
                </div>
            </div>
        </div>
    );
};

export default Revenue;