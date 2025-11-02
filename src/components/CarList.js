// src/components/CarList.jsx
import React, { useState } from "react";
import ConfirmModal from "./ConfirmModal";

function CarCard({ car, onEdit, onDelete }) {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-cyan-500/20 rounded-2xl p-5 shadow-md w-full max-w-[320px]">
      <h3 className="text-cyan-400 text-xl font-bold mb-1">{car.brand}</h3>
      <p className="text-gray-300">Model: {car.model}</p>
      <p className="text-gray-400">💰 Price: ${car.price}</p>

      <div className="mt-4 flex gap-3 justify-end">
        <button
          onClick={() => onEdit(car)}
          className="px-3 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:scale-105 transition"
        >
          ✏️ Edit
        </button>
        <button
          onClick={() => onDelete(car.id)}
          className="px-3 py-2 rounded-lg bg-red-600 text-white font-semibold hover:scale-105 transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default function CarList({ cars = [], onEdit, onDelete }) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  if (!cars || cars.length === 0) {
    return <p className="text-center text-gray-400">No cars available.</p>;
  }

  const requestDelete = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const doDelete = () => {
    onDelete(selectedId);
    setConfirmOpen(false);
    setSelectedId(null);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <CarCard
            key={car.id}
            car={car}
            onEdit={onEdit}
            onDelete={requestDelete}
          />
        ))}
      </div>

      <ConfirmModal
        open={confirmOpen}
        title="Delete car"
        description="Are you sure you want to delete this car? This action cannot be undone."
        onConfirm={doDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  );
}
