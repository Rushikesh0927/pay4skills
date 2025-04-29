// API configuration for both development and production environments
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Common headers for API requests
const headers = {
  'Content-Type': 'application/json'
};

// Add authentication token to headers if available
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { ...headers, Authorization: `Bearer ${token}` } : headers;
};

// API request helper functions
const api = {
  // GET request
  get: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'GET',
        headers: authHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('API GET Error:', error);
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API POST Error:', error);
      throw error;
    }
  },

  // PUT request
  put: async (endpoint, data) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('API PUT Error:', error);
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      return await response.json();
    } catch (error) {
      console.error('API DELETE Error:', error);
      throw error;
    }
  }
};

export default api; 