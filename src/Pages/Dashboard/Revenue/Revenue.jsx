import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading/Loading";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { FaTicketAlt, FaChartLine, FaWallet } from "react-icons/fa";

const Revenue = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = use(AuthContext);

  const { isPending, data: revenue = {} } = useQuery({
    queryKey: ["revenue", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/vendor/revenue");
      return res.data;
    },
  });

  if (isPending) return <Loading />;

  const chartData = [
    { name: "Tickets Listed", value: revenue?.totalTicketsAdded || 0, color: "#0F172A" }, // Navy
    { name: "Tickets Sold", value: revenue?.totalTicketsSold || 0, color: "#38BDF8" },   // Sky Blue
  ];

  return (
    <div className="animate__animated animate__fadeIn pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b border-base-200 pb-6">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaChartLine className="text-accent" /> Rev. <span className="text-accent">Insights</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Real-time performance and financial breakdown
          </p>
        </div>
      </div>

      {/* Analytics Summary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-[2rem] border border-base-300 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-primary text-white rounded-2xl">
              <FaTicketAlt size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Inventory</p>
              <p className="text-2xl font-black text-primary">{revenue.totalTicketsAdded}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-base-300 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent text-primary rounded-2xl">
              <FaChartLine size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Sales Volume</p>
              <p className="text-2xl font-black text-primary">{revenue.totalTicketsSold}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-accent/20 bg-accent/5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-green-500 text-white rounded-2xl">
              <FaWallet size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-secondary uppercase tracking-[0.15em]">Total Earnings</p>
              <p className="text-2xl font-black text-primary">TK {revenue.totalRevenue?.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Volume Chart Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
        <div className="mb-6">
          <h3 className="text-lg font-black text-primary uppercase tracking-tighter">Volume Comparison</h3>
          <p className="text-[10px] font-bold text-secondary uppercase">Listed vs Sold Units</p>
        </div>
        
        <div style={{ width: "100%", height: 350 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={60}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748B', fontSize: 10, fontWeight: 900}} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{fill: '#64748B', fontSize: 10}} 
              />
              <Tooltip 
                cursor={{fill: '#F1F5F9'}}
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                itemStyle={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase' }}
              />
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Revenue;