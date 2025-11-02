import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosClient";

// ✅ FETCH cars with pagination params
export const fetchCars = createAsyncThunk(
  "cars/fetchCars",
  async ({ page = 0, size = 5 }) => {
    const response = await axios.get(`/cars?page=${page}&size=${size}`);
    return response.data;
  }
);

// ✅ ADD car
export const addCar = createAsyncThunk("cars/addCar", async (carData) => {
  const response = await axios.post("/cars", carData);
  return response.data;
});

// ✅ UPDATE car
export const updateCar = createAsyncThunk(
  "cars/updateCar",
  async ({ id, carData }) => {
    const response = await axios.put(`/cars/updateCar/${id}`, carData);
    return response.data;
  }
);

// ✅ DELETE car
export const deleteCar = createAsyncThunk(
  "cars/deleteCar",
  async (id) => {
    await axios.delete(`/cars/${id}`);
    return id; // Return deleted car ID so we can remove it from state
  }
);

const carSlice = createSlice({
  name: "cars",
  initialState: {
    cars: [],
    status: "idle",
    error: null,
    page: 0,
    size: 10,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // ADD
      .addCase(addCar.fulfilled, (state, action) => {
        state.cars.push(action.payload);
      })

      // UPDATE
      .addCase(updateCar.fulfilled, (state, action) => {
        const index = state.cars.findIndex(
          (car) => car.id === action.payload.id
        );
        if (index !== -1) {
          state.cars[index] = action.payload;
        }
      })

      // DELETE
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      });
  },
});

export default carSlice.reducer;
