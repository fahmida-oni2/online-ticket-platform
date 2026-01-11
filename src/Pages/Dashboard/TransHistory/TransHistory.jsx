import React, { use } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaHistory, FaReceipt, FaCalendarAlt, FaMoneyCheckAlt } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

const TransHistory = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isPending) return <Loading />;

  return (
    <div className="animate__animated animate__fadeIn">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaHistory className="text-accent" />  <span className="text-accent">History</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            Track your payments and download invoices
          </p>
        </div>
        
        {/* Total Spent Summary Badge */}
        <div className="bg-primary px-6 py-3 rounded-2xl shadow-lg shadow-primary/20 flex flex-col">
          <span className="text-[9px] font-black text-white/60 uppercase">Total Spent</span>
          <span className="text-xl font-black text-accent tracking-tight">
            TK {payments.reduce((acc, curr) => acc + curr.amount, 0)}
          </span>
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="overflow-hidden rounded-[1.5rem] border border-base-300 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            {/* Custom Styled Head */}
            <thead className="bg-primary text-white uppercase text-[10px] font-black tracking-widest">
              <tr>
                <th className="py-5 pl-8">#</th>
                <th><div className="flex items-center gap-2"><FaReceipt className="text-accent" /> Transaction ID</div></th>
                <th><div className="flex items-center gap-2"><FaMoneyCheckAlt className="text-accent" /> Amount</div></th>
                <th>Ticket Title</th>
                <th className="pr-8"><div className="flex items-center gap-2"><FaCalendarAlt className="text-accent" /> Date</div></th>
              </tr>
            </thead>
            <tbody className="text-primary font-bold">
              {payments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-20 text-secondary opacity-50 uppercase text-xs tracking-widest">
                    No transactions recorded yet.
                  </td>
                </tr>
              ) : (
                payments.map((payment, index) => (
                  <tr 
                    key={payment._id} 
                    className="hover:bg-base-200/50 transition-colors border-b border-base-200 last:border-none"
                  >
                    <td className="pl-8 text-secondary font-medium">{index + 1}</td>
                    <td>
                      <span className="font-mono bg-base-200 px-3 py-1 rounded-lg text-primary text-xs select-all">
                        {payment.transactionId}
                      </span>
                    </td>
                    <td className="text-lg font-black text-primary">
                      TK <span className="text-accent">{payment.amount}</span>
                    </td>
                    <td className="uppercase text-xs tracking-tight max-w-xs truncate">
                      {payment.ticketTitle}
                    </td>
                    <td className="pr-8 text-secondary text-xs">
                      {new Date(payment.paidAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric'
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransHistory;