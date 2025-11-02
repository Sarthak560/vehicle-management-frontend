import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api", // adjust to your Spring Boot backend port
});

export default axiosClient;