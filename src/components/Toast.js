// src/components/Toast.jsx
import React, { useEffect } from "react";

export default function Toast({ show, type = "success", message = "", onClose }) {
  useEffect(() => {
    if (show) {
      const t = setTimeout(() => onClose?.(), 3500);
      return () => clearTimeout(t);
    }
  }, [show, onClose]);

  if (!show) return null;

  const bg =
    type === "success"
      ? "bg-green-600"
      : type === "error"
      ? "bg-red-600"
      : "bg-gray-700";

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`max-w-sm px-4 py-3 rounded-lg shadow-lg text-white ${bg} animate-slide-in`}
        role="status"
      >
        <div className="flex items-center gap-3">
          <div className="font-medium">{message}</div>
          <button
            onClick={() => onClose?.()}
            className="ml-3 text-white/80 hover:text-white"
            aria-label="Close toast"
          >
            ✕
          </button>
        </div>
      </div>
      <style>{`
        @keyframes slideIn { from { transform: translateY(-12px); opacity:0 } to { transform: translateY(0); opacity:1 } }
        .animate-slide-in { animation: slideIn .22s ease-out both }
      `}</style>
    </div>
  );
}
