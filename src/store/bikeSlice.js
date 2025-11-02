import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../api/axiosClient";

// FETCH all bikes
export const fetchBikes = createAsyncThunk("bikes/fetchBikes", async () => {
  const response = await axios.get("/bike");
  return response.data;
});

// FETCH bike by ID
export const fetchBikeById = createAsyncThunk("bikes/fetchBikeById", async (id) => {
  const response = await axios.get(`/bike/${id}`);
  return response.data;
});

// ADD new bike
export const addBike = createAsyncThunk("bikes/addBike", async (bikeData) => {
  const response = await axios.post("/bike", bikeData);
  return response.data;
});

// DELETE bike
export const deleteBike = createAsyncThunk("bikes/deleteBike", async (id) => {
  await axios.delete(`/bike/${id}`);
  return id; // return ID to remove it from state
});

// UPDATE bike
// (Note: You don’t have an update endpoint yet in your controller, but I’ll include it for future use.)
export const updateBike = createAsyncThunk("bikes/updateBike", async ({ id, bikeData }) => {
  const response = await axios.put(`/bike/${id}`, bikeData);
  return response.data;
});

const bikeSlice = createSlice({
  name: "bikes",
  initialState: {
    bikes: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchBikes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBikes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.bikes = action.payload;
      })
      .addCase(fetchBikes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Fetch by ID
      .addCase(fetchBikeById.fulfilled, (state, action) => {
        const bike = action.payload;
        const existing = state.bikes.find((b) => b.id === bike.id);
        if (!existing) {
          state.bikes.push(bike);
        }
      })

      // Add Bike
      .addCase(addBike.fulfilled, (state, action) => {
        state.bikes.push(action.payload);
      })

      // Delete Bike
      .addCase(deleteBike.fulfilled, (state, action) => {
        state.bikes = state.bikes.filter((bike) => bike.id !== action.payload);
      })

      // Update Bike (for future use)
      .addCase(updateBike.fulfilled, (state, action) => {
        const index = state.bikes.findIndex((bike) => bike.id === action.payload.id);
        if (index !== -1) {
          state.bikes[index] = action.payload;
        }
      });
  },
});

export default bikeSlice.reducer;
