import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

// Create context
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // API base URL
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  // Check if token exists and is valid on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Check if token is expired
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          // Token is expired
          localStorage.removeItem('token');
          setIsAuthenticated(false);
          setCurrentUser(null);
          setUserRole(null);
          setLoading(false);
          return;
        }
        
        // Set auth header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Get user data
        const response = await axios.get(`${API_URL}/users/me`);
        
        setCurrentUser(response.data);
        setUserRole(response.data.role);
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setCurrentUser(null);
        setUserRole(null);
        setLoading(false);
      }
    };
    
    checkAuthStatus();
  }, [API_URL]);

  // Register user
  const register = async (userData) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/users/register`, userData);
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setUserRole(user.role);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      setError(null);
      const response = await axios.post(`${API_URL}/users/login`, { email, password });
      
      const { token, user } = response.data;
      
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setCurrentUser(user);
      setUserRole(user.role);
      setIsAuthenticated(true);
      
      return user;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw error;
    }
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    setCurrentUser(null);
    setUserRole(null);
    setIsAuthenticated(false);
  };

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      setError(null);
      const response = await axios.put(`${API_URL}/users/profile`, profileData);
      
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        userRole,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 