import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axiosClient";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/login", credentials);
      
      if (response.status === 200) {
        // Create user data object with credentials and authentication status
        const userData = {
          username: credentials.username,
          isAuthenticated: true,
          token: response.data.token, // Assuming backend sends a token
          timestamp: new Date().getTime() // Add timestamp for session management
        };
        // Set token in axios headers for subsequent requests
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        return userData;
      }
      return rejectWithValue("Invalid credentials");
    } catch (error) {
      if (error.response?.status === 401) {
        return rejectWithValue("Invalid username or password");
      }
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// User slice
const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.error = null;
      state.isAuthenticated = false;
      localStorage.removeItem("userInfo");
      // Force redirect to login page
      window.location.href = '/login';
    },
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      const savedUser = localStorage.getItem("userInfo");
      if (savedUser) {
        try {
          const parsedUser = JSON.parse(savedUser);
          // Check if the stored data has required fields
          if (!parsedUser || !parsedUser.username || !parsedUser.isAuthenticated) {
            localStorage.removeItem("userInfo");
            state.isAuthenticated = false;
            state.userInfo = null;
            return;
          }
          state.userInfo = parsedUser;
          state.isAuthenticated = true;
        } catch (e) {
          localStorage.removeItem("userInfo");
          state.isAuthenticated = false;
          state.userInfo = null;
        }
      } else {
        state.isAuthenticated = false;
        state.userInfo = null;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
        state.userInfo = null;
        localStorage.removeItem("userInfo");
      });
  },
});

export const { logout, clearError, initializeAuth } = userSlice.actions;
export default userSlice.reducer;
