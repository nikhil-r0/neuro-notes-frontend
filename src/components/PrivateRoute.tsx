// src/components/PrivateRoute.tsx
import React, { JSX, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const { userId } = useContext(AuthContext);
  return userId ? children : <Navigate to="/login" />;
};
