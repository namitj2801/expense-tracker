import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

// Create context for sharing user state across components
export const UserContext = createContext();

// Provider component that wraps the app and manages user authentication state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to update user data in state
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data and token on logout
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to check token validity and restore user session from localStorage
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch user data using the stored token to validate session
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const userData = response.data;

      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error restoring user session:", error);
      // If token is invalid (401), remove it and clear user state
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status when component mounts
  useEffect(() => {
    checkAuthStatus();
  }, []);

  // Provide user state and functions to child components
  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
