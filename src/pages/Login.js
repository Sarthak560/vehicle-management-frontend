import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userStore";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 border border-gray-700">
        <h2 className="text-3xl font-bold text-center text-yellow-400 mb-6">
          🏎️ Car Dashboard Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
