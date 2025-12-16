import React, { use } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData } from "react-router";

const AddTickets = () => {
  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();
  const serviceArea = useLoaderData() || [];
  const { register, handleSubmit, reset } = useForm();

  const perkOptions = [
    { label: " AC (Air Conditioning)", value: "AC" },
    { label: " Complimentary Breakfast", value: "Breakfast" },
    { label: " High-Speed WiFi", value: "WiFi" },
    { label: " Charging Ports", value: "ChargingPorts" },
    { label: " Priority Boarding", value: "PriorityBoarding" },
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
        toast.success("Ticket has been added successfully .");
        reset();
      } else {
        toast.error(
          "Ticket submission failed. Please check the server response."
        );
      }
    } catch (err) {
      toast.error("Error.");
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto my-10 p-6 bg-white rounded-xl shadow-2xl border border-gray-100">
        <h2 className="text-3xl text-center font-extrabold text-sky-800 mb-6  pb-3">
          Add New Ticket
        </h2>
        <form onSubmit={handleSubmit(handleAdded)} className="space-y-4">
          {/* Ticket title*/}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ticket title
            </label>
            <input
              type="text"
              name="ticketTitle"
              {...register("ticketTitle")}
              required
              className="mt-1 block w-full px-3 py-2 border  border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* From location */}
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">From</legend>
              <select
                {...register("fromLocation", { required: true })}
                defaultValue="Pick a location"
                className="select w-full"
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
              {...register("toLocation", { required: true })}
              defaultValue="Pick a location"
              className="select w-full "
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
              defaultValue={""}
              {...register("transportType", { required: true })}
              className="mt-1 block w-full px-3 py-2 border text-black border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select type
              </option>
              <option value="Bus">Bus</option>
              <option value="Train">Train</option>
              <option value="Flight">Flight</option>
            </select>
          </div>

          {/* Price (Number Input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Price (per ticket)
            </label>
            <input
              type="number"
              {...register("price", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              min="1"
              step="any"
              placeholder="e.g., 550"
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* ticket quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Ticket quantity
            </label>
            <input
              type="number"
              {...register("quantity", {
                required: true,
                valueAsNumber: true,
                min: 1,
              })}
              min="1"
              placeholder="e.g., 50"
              className="mt-1 block w-full px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* departure date and time */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <div>
              <input
                type="date"
                name="date"
                {...register("date", { required: true })}
                className="input input-bordered w-full mt-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Departure Time
            </label>
            <input
              type="time"
              {...register("departureTime", { required: true })}
              className="input input-bordered w-full mt-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
            />
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
                      value={perk.value}
                      {...register("perks")}
                      className="checkbox checkbox-sm checkbox-secondary"
                    />
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Image Link Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image Link (URL):
            </label>
            <input
              type="url"
              {...register("image")}
              placeholder="e.g., https://example.com/transport.jpg"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="pt-2 border-t mt-4 border-gray-200">
            <p className="text-lg font-semibold text-gray-700 mb-2">
              Posted By:
            </p>

            {/* Vendor Name (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Vendor Name:
              </label>
              <input
                type="text"
                value={user.displayName}
                {...register("vendorName")}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>

            {/* Vendor Email (Read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Vendor Email:
              </label>
              <input
                type="email"
                {...register("vendorEmail")}
                value={user.email}
                readOnly
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md bg-gray-50 text-gray-600 sm:text-sm cursor-not-allowed"
              />
            </div>
          </div>

          {/* Add Ticket Button */}
          <input
            type="submit"
            className="btn bg-sky-800 w-full mt-8 text-white"
            value="Add Ticket"
          />
        </form>
      </div>
      <Toaster></Toaster>
    </>
  );
};

export default AddTickets;
