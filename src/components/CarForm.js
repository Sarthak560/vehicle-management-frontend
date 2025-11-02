// src/components/CarForm.jsx
import React, { useEffect, useState } from "react";

export default function CarForm({ onSubmit, selectedCar }) {
  const [car, setCar] = useState({ brand: "", model: "", price: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCar) setCar({ ...selectedCar });
  }, [selectedCar]);

  const validate = () => {
    const e = {};
    if (!car.brand || car.brand.trim().length < 2) e.brand = "Brand required";
    if (!car.model || car.model.trim().length < 1) e.model = "Model required";
    if (car.price === "" || Number(car.price) <= 0) e.price = "Enter valid price";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e) => {
    setCar((s) => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      brand: car.brand.trim(),
      model: car.model.trim(),
      price: Number(car.price),
      id: car.id,
    });
    setCar({ brand: "", model: "", price: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
      <input
        name="brand"
        placeholder="Brand"
        value={car.brand}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.brand ? "border-red-500" : "border-cyan-400/20"
        }`}
      />
      {errors.brand && <div className="text-red-400 text-sm">{errors.brand}</div>}

      <input
        name="model"
        placeholder="Model"
        value={car.model}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.model ? "border-red-500" : "border-cyan-400/20"
        }`}
      />
      {errors.model && <div className="text-red-400 text-sm">{errors.model}</div>}

      <input
        name="price"
        placeholder="Price"
        type="number"
        value={car.price}
        onChange={handleChange}
        className={`p-3 rounded-lg bg-gray-800/60 placeholder-gray-400 text-white outline-none border ${
          errors.price ? "border-red-500" : "border-cyan-400/20"
        }`}
      />
      {errors.price && <div className="text-red-400 text-sm">{errors.price}</div>}

      <button
        type="submit"
        className="mt-2 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 font-bold text-black hover:scale-105"
      >
        {selectedCar ? "Update" : "Add"}
      </button>
    </form>
  );
}
