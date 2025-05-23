// src/context/AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { apiService } from '../api/apiService';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  userName: string | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);
  const [userId, setUserId]     = useState<string | null>(null);
  const navigate = useNavigate();

  // restore on reload
  useEffect(() => {
    const name = localStorage.getItem('userName');
    const id   = localStorage.getItem('userId');
    if (name && id) {
      setUserName(name);
      setUserId(id);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiService.login({ email, password });
    if (res.user_id && res.name) {
      setUserId(res.user_id);
      setUserName(res.name);
      console.log(userId);
      localStorage.setItem('userId', res.user_id);
      localStorage.setItem('userName', res.name);
      navigate('/dashboard');
    } else {
      throw new Error(res.error || 'Login failed');
    }
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await apiService.registerUser({ name, email, password });
    if (res.message) {
      // treat as logged-in immediately
      setUserName(name);
      // no user_id returned on register—force the user to login
      navigate('/login');
    } else {
      throw new Error(res.error || 'Registration failed');
    }
  };

  const logout = () => {
    setUserName(null);
    setUserId(null);
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ userName, userId, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
