import axios from "axios";
import { BASE_URL } from "./apiPaths";
// import { useNavigate } from "react-router-dom";

// Create configured axios instance with base URL and default settings
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 second timeout for requests
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor to automatically add JWT token to all requests
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      // Add Bearer token to Authorization header if available
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common HTTP errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors globally
    if (error.response) {
      if (error.response.status === 401) {
        // If the user is not authenticated, redirect to the login page
        window.location.href = "/login";
      } else if (error.response.status === 500) {
        console.log("Server error. Please try again later");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request timeout. Please try again later");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
