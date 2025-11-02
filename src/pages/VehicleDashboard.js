// src/pages/VehicleDashboard.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, addCar, updateCar, deleteCar } from "../store/carSlice";
import { fetchBikes, addBike, updateBike, deleteBike } from "../store/bikeSlice";
import CarForm from "../components/CarForm";
import garageImage from "../assets/ok.jpg";
import CarList from "../components/CarList";
import BikeForm from "../components/BikeForm";
import BikeList from "../components/BikeList";
import { motion, AnimatePresence } from "framer-motion";
import Toast from "../components/Toast";

function VehicleDashboard() {
  const [viewType, setViewType] = useState("car");
  const [view, setView] = useState("home");
  const [page, setPage] = useState(0);
  const [size, _setSize] = useState(5);
  const [selectedItem, setSelectedItem] = useState(null);

  // toast state
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const dispatch = useDispatch();
  const vehicleState = useSelector((state) => (viewType === "car" ? state.cars : state.bikes));
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, viewType, view, page, size]);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const handleAddOrUpdate = (data) => {
    try {
      if (selectedItem) {
        if (viewType === "car") dispatch(updateCar({ id: selectedItem.id, carData: data }));
        else dispatch(updateBike({ id: selectedItem.id, bikeData: data }));
        showToast(`${viewType} updated.`);
      } else {
        if (viewType === "car") dispatch(addCar(data));
        else dispatch(addBike(data));
        showToast(`${viewType} added.`);
      }
      setSelectedItem(null);
      setView("home");
    } catch (err) {
      showToast("Operation failed", "error");
    }
  };

  const handleDelete = (id) => {
    // note: the modal appears inside list components; here we just call action
    if (viewType === "car") {
      dispatch(deleteCar(id));
      showToast("Car deleted.");
    } else {
      dispatch(deleteBike(id));
      showToast("Bike deleted.");
    }
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setView("add");
  };

  const ListComponent = viewType === "car" ? CarList : BikeList;
  const FormComponent = viewType === "car" ? CarForm : BikeForm;
  const accent = viewType === "car" ? "from-cyan-500 to-blue-500" : "from-emerald-500 to-teal-400";
  const titleColor = viewType === "car" ? "text-cyan-400" : "text-emerald-400";
  const titleEmoji = viewType === "car" ? "🚗" : "🏍️";

  return (
    <div
      className="min-h-screen flex text-gray-100 font-[Inter] overflow-hidden relative"
      style={{
        backgroundImage: `linear-gradient(rgba(10,10,10,0.9), rgba(15,15,15,0.95)), url(${garageImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* SIDEBAR */}
      <aside className="w-72 hidden md:flex flex-col bg-[#0b0e10]/95 p-6 border-r border-cyan-900/20">
        <h2 className="text-2xl font-bold text-cyan-400 tracking-wide mb-8 text-center">
          Sarthak <span className="text-gray-500 text-sm">Garage</span>
        </h2>
        <nav className="flex flex-col gap-3">
          <button
            onClick={() => { setViewType("car"); setView("home"); }}
            className={`px-4 py-3 rounded-xl text-left font-semibold transition ${viewType === "car" ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-300" : "hover:bg-gray-800/30 text-gray-300"}`}
          >
            🚗 Cars
          </button>

          <button
            onClick={() => { setViewType("bike"); setView("home"); }}
            className={`px-4 py-3 rounded-xl text-left font-semibold transition ${viewType === "bike" ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 text-emerald-300" : "hover:bg-gray-800/30 text-gray-300"}`}
          >
            🏍️ Bikes
          </button>

          <button onClick={() => setView("list")} className="mt-8 px-4 py-3 rounded-xl font-semibold bg-gray-800/60 text-gray-200">
            📋 View List
          </button>
          <button onClick={() => { setSelectedItem(null); setView("add"); }} className="px-4 py-3 rounded-xl font-semibold bg-gradient-to-r from-orange-400 to-amber-300 text-black mt-3">
            ➕ Add New
          </button>
        </nav>

        <footer className="mt-auto text-xs text-gray-500 text-center">ⓒ 2025 NextFleet Systems</footer>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-40 flex flex-col gap-2">
        <div className="bg-[#0b0e10]/95 px-4 py-2 rounded-lg border border-cyan-900/20 flex items-center gap-3 w-full">
          <div className="text-cyan-300 font-bold">Sarthak Garage</div>
          <div className="ml-auto flex gap-2">
            <button onClick={() => setView("list")} className="px-3 py-1 bg-gray-800 rounded text-sm">List</button>
            <button onClick={() => { setSelectedItem(null); setView("add"); }} className="px-3 py-1 bg-amber-400 rounded text-sm">Add</button>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          <button
            onClick={() => { setViewType("car"); setView("home"); }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              viewType === "car" 
                ? "bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30 text-cyan-300" 
                : "bg-[#0b0e10]/95 text-gray-300"
            }`}
          >
            🚗 Cars
          </button>
          <button
            onClick={() => { setViewType("bike"); setView("home"); }}
            className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
              viewType === "bike" 
                ? "bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-400/30 text-emerald-300" 
                : "bg-[#0b0e10]/95 text-gray-300"
            }`}
          >
            🏍️ Bikes
          </button>
        </div>
      </div>

      {/* MAIN */}
      <main className="flex-1 px-6 md:px-10 py-10 pt-32 md:pt-8 overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mb-6">
          <h1 className={`text-2xl sm:text-3xl font-bold tracking-wide ${titleColor}`}>{titleEmoji} {viewType === "car" ? "Car" : "Bike"} Management</h1>
          <div className="bg-[#0b0e10]/80 px-3 py-1 rounded-lg border border-gray-700/50 text-sm text-gray-400 self-start sm:self-auto">
            Status: <span className={status === "loading" ? "text-yellow-400" : status === "failed" ? "text-red-500" : "text-green-400"}>{status || "idle"}</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {view === "home" && (
            <motion.div key="home" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setView("list")} className={`px-6 py-3 rounded-2xl font-semibold bg-gradient-to-r ${accent} text-black`}>View All {viewType === "car" ? "Cars" : "Bikes"}</button>
                <button onClick={() => setView("add")} className="px-6 py-3 rounded-2xl font-semibold bg-amber-400 text-black">➕ Add New</button>
              </div>
            </motion.div>
          )}

          {view === "list" && (
            <motion.section key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{titleEmoji} Available {viewType === "car" ? "Cars" : "Bikes"}</h2>

              <div className="bg-[#0b0f11]/80 p-6 rounded-2xl border border-gray-700">
                <ListComponent
                  cars={vehicleState?.cars}
                  bikes={vehicleState?.bikes}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex gap-3">
                  <button onClick={() => setPage(p => Math.max(p - 1, 0))} disabled={page === 0} className="px-4 py-2 rounded-lg bg-gray-800/70">⬅ Previous</button>
                  <button onClick={() => setPage(p => p + 1)} className="px-4 py-2 rounded-lg bg-cyan-600 text-black">Next ➡</button>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-gray-300">Page size:</span>
                  <select value={size} onChange={(e) => _setSize(Number(e.target.value))} className="bg-gray-900 px-3 py-2 rounded-lg">
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                  </select>
                </div>
              </div>
            </motion.section>
          )}

          {view === "add" && (
            <motion.section key="add" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <h2 className={`text-2xl font-bold ${titleColor} mb-4`}>{selectedItem ? `Edit ${viewType}` : `Add New ${viewType}`}</h2>
              <div className="bg-[#0b0f11]/90 p-6 rounded-2xl border border-gray-700 max-w-2xl">
                <FormComponent
                  onSubmit={handleAddOrUpdate}
                  selectedCar={viewType === "car" ? selectedItem : null}
                  selectedBike={viewType === "bike" ? selectedItem : null}
                />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {status === "failed" && <div className="mt-4 text-red-500">Error: {error}</div>}
      </main>

      {/* Toast */}
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default VehicleDashboard;
