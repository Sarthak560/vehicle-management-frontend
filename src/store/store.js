import { configureStore } from "@reduxjs/toolkit";
import carReducer from "./carSlice";
import bikeReducer from "./bikeSlice";
import userReducer from "./userStore";

const store = configureStore({
  reducer: {
    cars: carReducer,
    bikes: bikeReducer,
    user: userReducer,
  },
});

export default store;
