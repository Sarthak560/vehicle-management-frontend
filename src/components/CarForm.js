import React, { useEffect, useState } from "react";

function CarForm({ onSubmit, selectedCar }) {
  const [car, setCar] = useState({ brand: "", model: "", price: "" });

  useEffect(() => {
    if (selectedCar) setCar(selectedCar);
  }, [selectedCar]);

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(car);
    setCar({ brand: "", model: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {["brand", "model", "price"].map((field) => (
        <input
          key={field}
          name={field}
          type={field === "price" ? "number" : "text"}
          value={car[field]}
          onChange={handleChange}
          placeholder={`Enter ${field}`}
          className="p-3 bg-gray-800/60 text-white rounded-xl focus:ring-2 focus:ring-cyan-400 outline-none border border-cyan-400/20 placeholder-gray-400 transition-all duration-200"
          required
        />
      ))}
      <button
        type="submit"
        className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold py-3 rounded-xl hover:scale-105 hover:shadow-[0_0_25px_#00eaff80] transition-all duration-300"
      >
        {selectedCar ? "Update Car" : "Add Car"}
      </button>
    </form>
  );
}

export default CarForm;
