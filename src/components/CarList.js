import React, { useState } from "react";

function CarList({ cars, onEdit, onDelete }) {
  const [deleteId, setDeleteId] = useState(null); // store car ID to delete
  const [showConfirm, setShowConfirm] = useState(false); // popup visibility

  if (!cars || cars.length === 0) {
    return <p className="text-gray-400 text-center">No cars available.</p>;
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    if (deleteId) {
      onDelete(deleteId);
    }
    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  return (
    <>
      {/* Cars grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {cars.map((car) => (
          <div
            key={car.id}
            className="bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_20px_#00eaff50] hover:shadow-[0_0_35px_#00eaff90] transition-all transform hover:-translate-y-2 duration-300"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-2">
              {car.brand}
            </h3>
            <p className="text-gray-300">Model: {car.model}</p>
            <p className="text-gray-400 mb-4">💰 Price: ${car.price}</p>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => onEdit(car)}
                className="px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300"
              >
                ✏️ Edit
              </button>
              <button
                onClick={() => handleDeleteClick(car.id)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-500 transition-all duration-300"
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm z-50">
          <div className="bg-gray-900 border border-cyan-400 rounded-xl p-6 shadow-[0_0_30px_#00eaff70] text-center w-[90%] sm:w-[400px]">
            <h2 className="text-xl font-bold text-cyan-400 mb-3">
              Confirm Delete
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this car?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmDelete}
                className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-500 transition-all"
              >
                Yes, Delete
              </button>
              <button
                onClick={cancelDelete}
                className="px-5 py-2 bg-gray-700 text-cyan-400 rounded-lg font-semibold hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarList;
