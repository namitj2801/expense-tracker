// Base URL for the backend API server
export const BASE_URL = "http://localhost:8000";

// Centralized API endpoint definitions for consistent usage across the application
export const API_PATHS = {
  // Authentication-related endpoints
  AUTH: {
    LOGIN: "/api/v1/auth/login",
    REGISTER: "/api/v1/auth/register",
    GET_USER_INFO: "/api/v1/auth/getuser",
  },
  // Dashboard data endpoint
  DASHBOARD: {
    GET_DATA: "/api/v1/dashboard",
  },
  // Income management endpoints
  INCOME: {
    ADD_INCOME: "/api/v1/income/add",
    GET_ALL_INCOME: "/api/v1/income/get",
    DELETE_INCOME: (incomeId) => `/api/v1/income/delete/${incomeId}`, // Dynamic route with ID parameter
    DOWNLOAD_INCOME: `/api/v1/income/downloadexcel`,
  },
  // Expense management endpoints
  EXPENSE: {
    ADD_EXPENSE: "/api/v1/expense/add",
    GET_ALL_EXPENSE: "/api/v1/expense/get",
    DELETE_EXPENSE: (expenseId) => `/api/v1/expense/delete/${expenseId}`, // Dynamic route with ID parameter
    DOWNLOAD_EXPENSE: `/api/v1/expense/downloadexcel`,
  },
  // File upload endpoint
  IMAGE: {
    UPLOAD_IMAGE: "/api/v1/auth/upload-image",
  },
};
