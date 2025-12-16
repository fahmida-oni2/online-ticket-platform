import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ModalOverlay = ({ children, onClose }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={onClose}
  >
    <div
      className="bg-white p-6 rounded-lg shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </div>
  </div>
);
const UpdateTicket = ({ ticket, onClose }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { data: serviceArea = [], isLoading:isAreaLoading } = useQuery({
    queryKey: ["serviceArea"],
    queryFn: async () => {
      const res = await fetch("/service.json");
      if (!res.ok) {
        throw new Error("Failed to fetch service areas");
      }
      return res.json();
    },
    staleTime: Infinity,
  });
  const city = [...new Set(serviceArea.map((c) => c.city_name))];
  const perkOptions = [
    { label: " AC (Air Conditioning)", value: "AC" },
    { label: " Complimentary Breakfast", value: "Breakfast" },
    { label: " High-Speed WiFi", value: "WiFi" },
    { label: " Charging Ports", value: "ChargingPorts" },
    { label: " Priority Boarding", value: "PriorityBoarding" },
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
      return axiosSecure.patch(`/all-tickets/${ticket._id}`, updatedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-tickets"] });
      toast.success("Ticket updated successfully!");
      onClose();
    },
    onError: (error) => {
      toast.error("Failed to update ticket.");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };
  return (
    <ModalOverlay onClose={onClose}>
      <h3 className="text-2xl font-bold mb-4">
        Edit Ticket: {ticket.ticketTitle}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 1. Ticket Title */}
        <div className="flex flex-col">
          <label htmlFor="ticketTitle" className="text-sm font-medium">
            Ticket Title
          </label>
          <input
            type="text"
            name="ticketTitle"
            value={formData.ticketTitle}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            disabled={updateMutation.isPending}
          />
        </div>

        {/* 2. Price */}
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium">
            Price (TK)
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            disabled={updateMutation.isPending}
          />
        </div>

        {/* 3. Quantity */}
        <div className="flex flex-col">
          <label htmlFor="quantity" className="text-sm font-medium">
            Quantity (Seats)
          </label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            disabled={updateMutation.isPending}
          />
        </div>

        {/* From location */}
        <div>
          <fieldset className="fieldset">
            <legend className="fieldset-legend">From</legend>
            <select
              name="fromLocation"
              value={formData.fromLocation}
              onChange={handleChange}
              required
              className="border p-2 rounded"
              disabled={updateMutation.isPending}
            >
              <option disabled={true}>Pick a location</option>
              {city.map((c, i) => (
                <option key={i} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </fieldset>
        </div>

        {/* To location */}
        <fieldset className="fieldset">
          <legend className="fieldset-legend">To</legend>
          <select
            name="toLocation"
            value={formData.toLocation}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            disabled={updateMutation.isPending}
          >
            <option disabled={true}>Pick a location</option>
            {city.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </fieldset>

        {/* Transport type */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transport type
          </label>
          <select
            name="transportType"
            value={formData.transportType}
            onChange={handleChange}
            required
            className="border p-2 rounded"
            disabled={updateMutation.isPending}
          >
            <option value="" disabled>
              Select type
            </option>
            <option value="Bus">Bus</option>
            <option value="Train">Train</option>
            <option value="Flight">Flight</option>
          </select>
        </div>
        {/* perks */}
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Perks</h4>
          <div className="grid grid-cols-2 gap-3">
            {perkOptions.map((perk) => (
              <div key={perk.value} className="form-control">
                <label className="label cursor-pointer p-0">
                  <span className="label-text">{perk.label}</span>
                  <input
                    type="checkbox"
                    name="perks"
                    value={perk.value}
                    checked={formData.perks.includes(perk.value)}
                    onChange={handleChange}
                   
                    className="checkbox"
                    disabled={updateMutation.isPending}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-4 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="btn bg-gray-300 text-gray-800 p-2 rounded"
            disabled={updateMutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn bg-green-600 text-white p-2 rounded hover:bg-green-700"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </ModalOverlay>
  );
};

export default UpdateTicket;
