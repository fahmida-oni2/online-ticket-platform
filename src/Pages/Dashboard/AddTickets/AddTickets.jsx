import React, { use } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";
import { FaPlusCircle, FaMapMarkerAlt, FaBus, FaCalendarAlt, FaStar } from "react-icons/fa";

const AddTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const serviceArea = useLoaderData() || [];
  const { register, handleSubmit, reset } = useForm();

  const perkOptions = [
    { label: "AC (Air Conditioning)", value: "AC" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "High-Speed WiFi", value: "WiFi" },
    { label: "Charging Ports", value: "ChargingPorts" },
    { label: "Priority Boarding", value: "PriorityBoarding" },
  ];

  const city = [...new Set(serviceArea.map((c) => c.city_name))];

  const handleAdded = async (data) => {
    const ticketData = {
      ticketTitle: data.ticketTitle,
      fromLocation: data.fromLocation,
      toLocation: data.toLocation,
      transportType: data.transportType,
      price: parseFloat(data.price),
      quantity: parseInt(data.quantity),
      departureDate: data.date,
      departureTime: data.departureTime,
      perks: data.perks || [],
      imageUrl: data.image,
      vendorName: user?.displayName,
      vendorEmail: user?.email,
      postedDate: new Date().toISOString(),
      verificationStatus: "pending",
    };
    try {
      const res = await axiosSecure.post("/tickets", ticketData);

      if (res.status === 200 || res.status === 201) {
        const vendorInfo = { ...ticketData };
        await axiosSecure.post("/vendor", vendorInfo);
        await axiosSecure.patch(`/users/role/${user?.email}`, { role: 'vendor' });
        toast.success("Ticket submitted for approval!");
        reset();
      }
    } catch (err) {
      toast.error("An error occurred while adding the ticket.");
    }
  };

  return (
    <div className="animate__animated animate__fadeIn pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
            <FaPlusCircle className="text-accent" /> Create <span className="text-accent">New Ticket</span>
          </h1>
          <p className="text-[11px] font-bold text-secondary uppercase tracking-widest mt-1 ml-1">
            List a new journey and reach thousands of travelers
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[2rem] border border-base-300 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit(handleAdded)} className="p-8 md:p-12 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="space-y-6">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-l-4 border-accent pl-3">General Information</h3>
            
            <div>
              <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Journey Title</label>
              <input
                type="text"
                {...register("ticketTitle")}
                required
         
                className="w-full px-5 py-4 bg-base-100 border border-base-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all font-bold text-primary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control w-full">
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-accent" /> From
                </label>
                <select
                  {...register("fromLocation", { required: true })}
                  className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold text-primary"
                >
                  <option value="">Origin City</option>
                  {city.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-400" /> To
                </label>
                <select
                  {...register("toLocation", { required: true })}
                  className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold text-primary"
                >
                  <option value="">Destination City</option>
                  {city.map((c, i) => <option key={i} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

       
          <div className="space-y-6 pt-6 border-t border-base-200">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-l-4 border-accent pl-3">Logistics & Pricing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Transport</label>
                <select
                  {...register("transportType", { required: true })}
                  className="select select-bordered w-full rounded-2xl bg-base-100 font-bold text-primary"
                >
                  <option value="Bus">Bus</option>
                  <option value="Train">Train</option>
                  <option value="Flight">Flight</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Price (TK)</label>
                <input
                  type="number"
                  {...register("price", { required: true, min: 1 })}
                  className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl font-bold text-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Available Seats</label>
                <input
                  type="number"
                  {...register("quantity", { required: true, min: 1 })}
                  className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl font-bold text-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-accent" /> Departure Date
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl font-bold text-primary"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Time</label>
                <input
                  type="time"
                  {...register("departureTime", { required: true })}
                  className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl font-bold text-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6 pt-6 border-t border-base-200">
            <h3 className="text-xs font-black text-primary uppercase tracking-[0.2em] border-l-4 border-accent pl-3">Amenities & Image</h3>
            
            <div className="grid  md:grid-cols-3 gap-4 bg-base-100 p-6 rounded-[2rem] border border-base-300">
              {perkOptions.map((perk) => (
                <label key={perk.value} className="flex items-center gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    value={perk.value}
                    {...register("perks")}
                    className="checkbox checkbox-accent checkbox-sm rounded-md"
                  />
                  <span className="text-[11px] font-black text-primary uppercase group-hover:text-accent transition-colors">
                    {perk.label}
                  </span>
                </label>
              ))}
            </div>

            <div>
              <label className="block text-[10px] font-black text-secondary uppercase tracking-widest mb-2">Cover Image URL</label>
              <input
                type="url"
                {...register("image")}
                placeholder="https://images.unsplash.com/your-ticket-image"
                className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl font-bold text-primary text-xs"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-5 bg-primary text-white rounded-[1.5rem] font-black uppercase tracking-[0.3em] text-xs hover:bg-accent hover:shadow-xl hover:shadow-accent/20 transition-all flex items-center justify-center gap-2 group"
          >
            Add Ticket <FaPlusCircle className="group-hover:rotate-90 transition-transform" />
          </button>
        </form>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default AddTickets;