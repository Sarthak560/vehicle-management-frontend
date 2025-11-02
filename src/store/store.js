import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import bikeReducer from "./bikeSlice";

const store = configureStore({
  reducer: {
    cars: carReducer,
    bikes: bikeReducer,
  },
});

export default store;
