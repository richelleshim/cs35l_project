import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = localStorage.getItem('user-info');
  
  if (!userInfo) {
    // If user-info is not found, redirect to the login page
    return <Navigate to="/" />;
  }

  // If user-info is found, render the component that was passed as children
  return children;
};

export default ProtectedRoute;
