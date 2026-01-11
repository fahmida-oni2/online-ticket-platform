import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { FaEdit, FaTimes, FaMapMarkerAlt, FaBus, FaStar } from "react-icons/fa";

// Refined Modal Overlay with Blur Effect
const ModalOverlay = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-primary/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    onClick={onClose}
  >
    <div
      className="bg-white rounded-[2.5rem] shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative border border-base-300 animate__animated animate__zoomIn animate__faster"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full bg-base-100 text-secondary hover:text-red-500 transition-colors z-10"
      >
        <FaTimes size={20} />
      </button>
      
      <div className="overflow-y-auto max-h-[90vh] p-8 md:p-10">
        {children}
      </div>
    </div>
  </div>
);

const UpdateTicket = ({ ticket, onClose, refetch }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();

  const { data: serviceArea = [] } = useQuery({
    queryKey: ["serviceArea"],
    queryFn: async () => {
      const res = await fetch("/service.json");
      if (!res.ok) throw new Error("Failed to fetch service areas");
      return res.json();
    },
    staleTime: Infinity,
  });

  const city = [...new Set(serviceArea.map((c) => c.city_name))];
  const perkOptions = [
    { label: "AC", value: "AC" },
    { label: "Breakfast", value: "Breakfast" },
    { label: "WiFi", value: "WiFi" },
    { label: "Charging Ports", value: "ChargingPorts" },
    { label: "Priority Boarding", value: "PriorityBoarding" },
  ];

  const [formData, setFormData] = useState({
    ticketTitle: ticket.ticketTitle,
    fromLocation: ticket.fromLocation,
    toLocation: ticket.toLocation,
    transportType: ticket.transportType,
    price: ticket.price,
    quantity: ticket.quantity,
    departureDate: ticket.departureDate,
    departureTime: ticket.departureTime,
    perks: ticket.perks || [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "perks" && type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        perks: checked
          ? [...prev.perks, value]
          : prev.perks.filter((p) => p !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateMutation = useMutation({
    mutationFn: (updatedData) => {
      return axiosSecure.patch(`/vendor/edit-ticket/${ticket._id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
      if (refetch) refetch();
      toast.success("Changes deployed successfully!");
      onClose();
    },
    onError: () => toast.error("Failed to update ticket."),
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  return (
    <ModalOverlay onClose={onClose}>
      <div className="mb-8">
        <h3 className="text-2xl font-black text-primary uppercase tracking-tighter flex items-center gap-3">
          <FaEdit className="text-accent" /> Edit <span className="text-accent">Ticket</span>
        </h3>
        <p className="text-[10px] font-bold text-secondary uppercase tracking-widest mt-1">
          Adjusting parameters for: {ticket.ticketTitle}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Journey Title</label>
          <input
            type="text"
            name="ticketTitle"
            value={formData.ticketTitle}
            onChange={handleChange}
            required
            className="w-full px-5 py-3 bg-base-100 border border-base-300 rounded-2xl focus:ring-2 focus:ring-accent/50 outline-none font-bold text-primary"
            disabled={updateMutation.isPending}
          />
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2">
              <FaMapMarkerAlt className="text-accent" /> From
            </label>
            <select
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              required
              className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold text-primary"
              disabled={updateMutation.isPending}
            >
              {city.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-400" /> To
            </label>
            <select
              name="toLocation"
              value={formData.toLocation}
              onChange={handleChange}
              required
              className="select select-bordered w-full rounded-2xl bg-base-100 border-base-300 font-bold text-primary"
              disabled={updateMutation.isPending}
            >
              {city.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Price (TK)</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-base-100 border border-base-300 rounded-xl font-bold text-primary"
              disabled={updateMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Seats</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-base-100 border border-base-300 rounded-xl font-bold text-primary"
              disabled={updateMutation.isPending}
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-secondary uppercase tracking-widest">Type</label>
            <select
              name="transportType"
              value={formData.transportType}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-base-100 border border-base-300 rounded-xl font-bold text-primary outline-none"
              disabled={updateMutation.isPending}
            >
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
            </select>
          </div>
        </div>

        {/* Perks Section */}
        <div className="pt-4 border-t border-base-200">
          <label className="text-[10px] font-black text-secondary uppercase tracking-widest mb-4 block">Included Amenities</label>
          <div className="grid grid-cols-2 gap-3 bg-base-100 p-4 rounded-2xl">
            {perkOptions.map((perk) => (
              <label key={perk.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="perks"
                  value={perk.value}
                  checked={formData.perks.includes(perk.value)}
                  onChange={handleChange}
                  className="checkbox checkbox-accent checkbox-sm rounded-md"
                  disabled={updateMutation.isPending}
                />
                <span className="text-[11px] font-black text-primary uppercase group-hover:text-accent transition-colors">{perk.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] bg-base-200 text-secondary hover:bg-base-300 transition-colors"
            disabled={updateMutation.isPending}
          >
            Discard
          </button>
          <button
            type="submit"
            className="flex-[2] py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:shadow-lg transition-all flex items-center justify-center gap-2"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : "Update Journey"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default UpdateTicket;