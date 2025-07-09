// src/components/ProtectedRoute.jsx
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userDataContext } from "../context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(userDataContext);

  // If not logged in, redirect to /signup
  if (!userData) {
    return <Navigate to="/signup" replace />;
  }

  return children;
};

export default ProtectedRoute;
