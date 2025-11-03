import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add auth token to requests
axiosClient.interceptors.request.use(config => {
  const token = localStorage.getItem('userInfo');
  if (token) {
    config.headers.Authorization = `Bearer ${JSON.parse(token).token}`;
  }
  return config;
});

export default axiosClient;