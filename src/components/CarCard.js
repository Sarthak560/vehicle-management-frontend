import React from "react";

function CarCard({ car, onDelete, onEdit }) {
  return (
    <div className="car-card">
      <h3>{car.brand} {car.model}</h3>
      <p>Price: ${car.price}</p>

      <div className="card-actions">
        <button onClick={() => onEdit(car)}>Edit</button>
        <button onClick={() => onDelete(car.id)}>Delete</button>
      </div>
    </div>
  );
}

export default CarCard;
