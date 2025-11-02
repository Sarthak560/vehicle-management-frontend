import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import VehicleDashboard from "./pages/VehicleDashboard";
import "./styles/theme.css";

function App() {
  return (
    <Provider store={store}>
      <VehicleDashboard />
    </Provider>
  );
}

export default App;
