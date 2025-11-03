import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import VehicleDashboard from "./pages/VehicleDashboard";
import LoginForm from "./components/LoginForm";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/theme.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';

// LoginWrapper to prevent authenticated users from accessing login page
const LoginWrapper = () => {
  const { isAuthenticated } = useSelector(state => state.user);
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <LoginForm />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Default route redirects to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      
      {/* Login route with protection against authenticated users */}
      <Route path="/login" element={<LoginWrapper />} />
      
      {/* Protected Dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <VehicleDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
