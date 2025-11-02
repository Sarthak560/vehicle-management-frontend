import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCars,
  addCar,
  updateCar,
  deleteCar,
} from "../store/carSlice";
import {
  fetchBikes,
  addBike,
  updateBike,
  deleteBike,
} from "../store/bikeSlice";
import CarForm from "../components/CarForm";
import garageImage from "../assets/ok.jpg";
import CarList from "../components/CarList";
import BikeForm from "../components/BikeForm";
import BikeList from "../components/BikeList";
import { motion, AnimatePresence } from "framer-motion";

function VehicleDashboard() {
  const [viewType, setViewType] = useState("car");
  const [view, setView] = useState("home");
  const [page, setPage] = useState(0);
  const [size, _setSize] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);

  const dispatch = useDispatch();
  const vehicleState = useSelector((state) =>
    viewType === "car" ? state.cars : state.bikes
  );
  const { status, error } = vehicleState || {};

  useEffect(() => {
    setPage(0);
  }, [viewType]);

  useEffect(() => {
    if (view === "list") {
      const params = { page, size };
      if (viewType === "car") dispatch(fetchCars(params));
      else dispatch(fetchBikes(params));
    }
  }, [dispatch, viewType, view, page, size]);

  const handleAddOrUpdate = (data) => {
    if (selectedItem) {
      if (viewType === "car")
        dispatch(updateCar({ id: selectedItem.id, carData: data }));
      else dispatch(updateBike({ id: selectedItem.id, bikeData: data }));
    } else {
      if (viewType === "car") dispatch(addCar(data));
      else dispatch(addBike(data));
    }
    setSelectedItem(null);
    setView("home");
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      if (viewType === "car") dispatch(deleteCar(id));
      else dispatch(deleteBike(id));
    }
  };


  const handleEdit = (item) => {
    setSelectedItem(item);
    setView("add");
  };

  const ListComponent = viewType === "car" ? CarList : BikeList;
  const FormComponent = viewType === "car" ? CarForm : BikeForm;
  const accent =
    viewType === "car"
      ? "from-cyan-500 to-blue-500"
      : "from-emerald-500 to-teal-400";
  const titleColor = viewType === "car" ? "text-cyan-400" : "text-emerald-400";
  const titleEmoji = viewType === "car" ? "🚗" : "🏍️";

  return (
    <div
      className="min-h-screen flex text-gray-100 font-[Inter] overflow-hidden relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.9), rgba(15,15,15,0.95)), url(${garageImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* ==== SIDEBAR ==== */}
      <div className="w-72 bg-[#111]/90 backdrop-blur-md border-r border-cyan-900/40 shadow-2xl p-6 flex flex-col justify-between relative overflow-hidden">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 tracking-wide mb-10 text-center">
            Sarthak <span className="text-gray-500 text-sm">Garage</span>
          </h2>

          <nav className="flex flex-col gap-3">
            <button
              onClick={() => {
                setViewType("car");
                setView("home");
              }}
              className={`px-4 py-3 rounded-xl text-left font-semibold transition-all ${viewType === "car"
                ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-md"
                : "hover:bg-gray-800/50 text-gray-300"
                }`}
            >
              🚗 Cars
            </button>

            <button
              onClick={() => {
                setViewType("bike");
                setView("home");
              }}
              className={`px-4 py-3 rounded-xl text-left font-semibold transition-all ${viewType === "bike"
                ? "bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-teal-400/40 text-emerald-300 shadow-md"
                : "hover:bg-gray-800/50 text-gray-300"
                }`}
            >
              🏍️ Bikes
            </button>

            <button
              onClick={() => setView("list")}
              className="mt-10 px-4 py-3 rounded-xl font-semibold bg-gray-800/60 text-gray-200 hover:bg-gray-700/70 transition-all shadow-md"
            >
              📋 View List
            </button>

            <button
              onClick={() => {
                setSelectedItem(null);
                setView("add");
              }}
              className="px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-500/30 to-amber-400/30 text-amber-300 hover:from-orange-500 hover:to-amber-400 transition-all shadow-md"
            >
              ➕ Add New
            </button>
          </nav>
        </div>

        <footer className="text-xs text-gray-500 text-center mt-10">
          ⓒ 2025 NextFleet Systems
        </footer>
      </div>

      {/* ==== MAIN CONTENT ==== */}
      <div className="flex-1 px-10 py-8 relative overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className={`text-3xl font-bold tracking-wide ${titleColor}`}>
            {titleEmoji} {viewType === "car" ? "Car" : "Bike"} Management
          </h1>
          <div className="text-sm text-gray-400">
            Status:{" "}
            <span
              className={`${status === "loading"
                ? "text-yellow-400"
                : status === "failed"
                  ? "text-red-500"
                  : "text-green-400"
                }`}
            >
              {status || "idle"}
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* ==== HOME VIEW ==== */}
          {view === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-[70vh] gap-10"
            >
              <motion.button
                onClick={() => setView("list")}
                className={`px-10 py-4 bg-gradient-to-r ${accent} text-black font-semibold text-lg rounded-2xl shadow-lg hover:shadow-cyan-500/30 hover:scale-105 transition-all duration-300`}
              >
                View All {viewType === "car" ? "Cars" : "Bikes"}
              </motion.button>

              <motion.button
                onClick={() => setView("add")}
                className="px-10 py-4 bg-gradient-to-r from-amber-400 to-orange-500 text-black font-semibold text-lg rounded-2xl shadow-lg hover:shadow-amber-400/40 hover:scale-105 transition-all duration-300"
              >
                ➕ Add New {viewType === "car" ? "Car" : "Bike"}
              </motion.button>
            </motion.div>
          )}

          {/* ==== LIST VIEW ==== */}
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="relative"
            >
              <h2 className={`text-2xl font-bold ${titleColor} mb-6`}>
                {titleEmoji} Available {viewType === "car" ? "Cars" : "Bikes"}
              </h2>

              <div className="bg-[#111]/80 border border-gray-700 rounded-2xl shadow-lg p-6 backdrop-blur-md">
                <ListComponent
                  cars={vehicleState.cars}
                  bikes={vehicleState.bikes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>

              {/* Pagination */}
              <div className="flex justify-between items-center mt-8 flex-wrap gap-4">
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                  disabled={page === 0}
                  className={`px-6 py-2 rounded-xl font-semibold transition-all ${page === 0
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-cyan-600 text-black hover:bg-cyan-500"
                    }`}
                >
                  ⬅ Previous
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-gray-300 font-medium">Page Size:</span>
                  <select
                    value={size}
                    onChange={(e) => _setSize(Number(e.target.value))}
                    className="bg-gray-900 text-white rounded-lg px-3 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>

                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-black font-semibold rounded-xl hover:from-cyan-400 hover:to-blue-400 transition-all shadow-md"
                >
                  Next ➡
                </button>
              </div>

              <div className="flex justify-end mt-8">
                <button
                  onClick={() => setView("home")}
                  className="px-6 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all"
                >
                  ⬅ Back
                </button>
              </div>
            </motion.div>
          )}

          {/* ==== ADD / EDIT VIEW ==== */}
          {view === "add" && (
            <motion.div
              key="add"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <h2
                className={`text-2xl font-bold ${titleColor} mb-6 text-center`}
              >
                {selectedItem ? `✏️ Edit ${viewType}` : `➕ Add New ${viewType}`}
              </h2>
              <div className="bg-[#111]/90 border border-gray-700 rounded-2xl p-8 shadow-lg backdrop-blur-md">
                <FormComponent
                  onSubmit={handleAddOrUpdate}
                  selectedCar={selectedItem}
                  selectedBike={selectedItem}
                />
              </div>

              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setView("home")}
                  className="px-6 py-2 bg-gray-700 text-gray-200 rounded-xl hover:bg-gray-600 transition-all"
                >
                  ⬅ Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {status === "failed" && (
          <p className="text-red-500 mt-4 text-sm">Error: {error}</p>
        )}
      </div>
    </div>
  );
}

export default VehicleDashboard;
