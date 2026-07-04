import axios from 'axios';

// Central Axios instance. Swap the baseURL / add interceptors once a real
// backend is available — every service call below already routes through here.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error:', error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
