import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { API_PATHS } from "../Utils/apiPaths";
import axiosInstance from "../Utils/axiosInstance";

// Custom hook for managing user authentication state and navigation
export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Skip if user data already exists
    if (user) return;

    // Flag to prevent state updates on unmounted component
    let isMounted = true;

    // Fetch user information from API if not already loaded
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);

        // Update user state only if component is still mounted
        if (isMounted && response.data) {
          updateUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user info: ", error);
        // Clear user data and redirect to login on authentication failure
        if (!isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    };

    fetchUserInfo();

    // Cleanup function to prevent memory leaks
    return () => {
      isMounted = false;
    };
  }, [updateUser, clearUser, navigate]);
};
