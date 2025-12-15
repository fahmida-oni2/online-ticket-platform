import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Loading from "../../../Components/Loading/Loading";
import VendorCard from "../../../Components/VendorCard/VendorCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAddedTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchTickets = async () => {
      setLoading(true);

      try {
        const response = await axiosSecure.get("/my-tickets", {
          params: {
            email: user.email, 
          },
        });

        setTickets(response.data);
      } catch (err) {
        setTickets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();

  }, [user?.email, axiosSecure]); 

  if (loading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-center font-bold text-3xl mt-5">Your Tickets</h1>
      <div className="">
        {tickets.length === 0 ? (
          <p className="text-center">No tickets found for your account.</p>
        ) : (
          <div className="grid grid-cols-1  lg:grid-cols-3 ">
            {tickets.map((ticket) => (
              <VendorCard key={ticket._id} ticket={ticket}></VendorCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAddedTickets;
