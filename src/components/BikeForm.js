import React, { useState, useEffect } from "react";

function BikeForm({ onSubmit, selectedBike }) {
  const [bikeData, setBikeData] = useState({
    brand: "",
    model: "",
    price: "",
  });

  useEffect(() => {
    if (selectedBike) {
      setBikeData(selectedBike);
    }
  }, [selectedBike]);

  const handleChange = (e) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(bikeData);
    setBikeData({ brand: "", model: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="brand"
        placeholder="Enter Bike Brand"
        value={bikeData.brand}
        onChange={handleChange}
        className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Enter Bike Model"
        value={bikeData.model}
        onChange={handleChange}
        className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Enter Price"
        value={bikeData.price}
        onChange={handleChange}
        className="px-4 py-2 rounded-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
        required
      />
      <button
        type="submit"
        className="px-6 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-xl shadow-[0_0_20px_#00eaff70] hover:scale-105 transition-all duration-300"
      >
        {selectedBike ? "Update Bike" : "Add Bike"}
      </button>
    </form>
  );
}

export default BikeForm;
