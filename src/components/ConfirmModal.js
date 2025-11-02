// src/components/ConfirmModal.jsx
import React from "react";

export default function ConfirmModal({ open, title = "Confirm", description, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#0b0f12] w-[90%] sm:w-[420px] rounded-xl p-6 border border-cyan-700/20 shadow-lg">
        <h3 className="text-cyan-300 text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-200 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500"
          >
            Yes, delete
          </button>
        </div>
      </div>
    </div>
  );
}
