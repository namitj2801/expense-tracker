import React, { createContext, useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";
import { API_PATHS } from "../Utils/apiPaths";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  // Function to clear user data (eg. on logout)
  const clearUser = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  // Function to check token and restore user session
  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      // Fetch user data using the stored token
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
      const userData = response.data;

      if (userData) {
        setUser(userData);
      }
    } catch (error) {
      console.error("Error restoring user session:", error);
      // If token is invalid, remove it and redirect to login
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("token");
        setUser(null);
      }
    } finally {
      setLoading(false);
    }
  };

  // Check authentication status on app initialization
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
