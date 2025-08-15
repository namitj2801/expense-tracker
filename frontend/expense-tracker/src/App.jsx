import React from "react";

// React Router components for navigation
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Page components
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";

// Context and utilities
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

// Main App component with routing configuration
const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            {/* Root route with authentication check */}
            <Route path="/" element={<Root />} />
            {/* Authentication routes */}
            <Route path="/login" exact element={<Login />} />
            <Route path="/signUp" exact element={<SignUp />} />
            {/* Protected dashboard routes */}
            <Route path="/dashboard" exact element={<Home />} />
            <Route path="/income" exact element={<Income />} />
            <Route path="/expense" exact element={<Expense />} />
          </Routes>
        </Router>
      </div>

      {/* Global toast notifications */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "13px",
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

// Root component for handling initial authentication redirect
const Root = () => {
  // Check if user is authenticated by looking for JWT token
  const isAuthenticated = !!localStorage.getItem("token");

  // Redirect to dashboard if authenticated, otherwise to login page
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/login"} />
  );
};
