import React from "react";

function CarList({ cars, onEdit }) {
  if (!cars || cars.length === 0) {
    return <p className="text-gray-400 text-center">No cars available.</p>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
      {cars.map((car) => (
        <div
          key={car.id}
          className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-cyan-500/30 rounded-2xl p-6 shadow-[0_0_20px_#00eaff50] hover:shadow-[0_0_35px_#00eaff90] transition-all transform hover:-translate-y-2 duration-300"
        >
          <h3 className="text-2xl font-bold text-cyan-400 mb-2">
            {car.brand}
          </h3>
          <p className="text-gray-300">Model: {car.model}</p>
          <p className="text-gray-400 mb-4">💰 Price: ${car.price}</p>

          <button
            onClick={() => onEdit(car)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-cyan-500 text-black font-semibold rounded-lg hover:bg-cyan-400 transition-all duration-300"
          >
            ✏️ Edit
          </button>
        </div>
      ))}
    </div>
  );
}

export default CarList;
