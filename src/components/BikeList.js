import React from "react";

function BikeList({ bikes = [], onEdit, onDelete }) {
  if (!bikes.length) {
    return <p className="text-center text-gray-400">No bikes available.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead className="bg-gray-800 text-cyan-300">
          <tr>
            <th className="p-3">Brand</th>
            <th className="p-3">Model</th>
            <th className="p-3">Price</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bikes.map((bike) => (
            <tr
              key={bike.id}
              className="border-b border-gray-700 hover:bg-gray-800 transition"
            >
              <td className="p-3">{bike.brand}</td>
              <td className="p-3">{bike.model}</td>
              <td className="p-3">₹{bike.price}</td>
              <td className="p-3 text-center space-x-3">
                <button
                  onClick={() => onEdit(bike)}
                  className="px-4 py-1 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-bold rounded-lg hover:scale-105 transition-all"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(bike.id)}
                  className="px-4 py-1 bg-red-600 text-white font-bold rounded-lg hover:bg-red-500 hover:scale-105 transition-all"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BikeList;
