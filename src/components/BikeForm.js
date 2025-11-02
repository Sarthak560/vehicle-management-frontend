// src/components/BikeForm.jsx
import React, { useEffect, useState } from "react";

export default function BikeForm({ onSubmit, selectedBike }) {
  const [bike, setBike] = useState({ brand: "", model: "", price: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedBike) setBike({ ...selectedBike });
  }, [selectedBike]);

  const validate = () => {
    const e = {};
    if (!bike.brand || bike.brand.trim().length < 2) e.brand = "Brand required";
    if (!bike.model || bike.model.trim().length < 1) e.model = "Model required";
    if (bike.price === "" || Number(bike.price) <= 0) e.price = "Enter valid price";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setBike((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      brand: bike.brand.trim(),
      model: bike.model.trim(),
      price: Number(bike.price),
      id: bike.id,
    });
    setBike({ brand: "", model: "", price: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        name="brand"
        placeholder="Brand"
        value={bike.brand}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.brand ? "border-red-500" : "border-emerald-400/20"
        }`}
      />
      {errors.brand && <div className="text-red-400 text-sm">{errors.brand}</div>}

      <input
        name="model"
        placeholder="Model"
        value={bike.model}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.model ? "border-red-500" : "border-emerald-400/20"
        }`}
      />
      {errors.model && <div className="text-red-400 text-sm">{errors.model}</div>}

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={bike.price}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.price ? "border-red-500" : "border-emerald-400/20"
        }`}
      />
      {errors.price && <div className="text-red-400 text-sm">{errors.price}</div>}

      <button
        type="submit"
        className="mt-2 py-3 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-400 font-bold text-black hover:scale-105"
      >
        {selectedBike ? "Update" : "Add"}
      </button>
    </form>
  );
}
