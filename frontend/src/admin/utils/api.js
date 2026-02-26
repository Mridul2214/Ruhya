import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Make sure this matches your backend port
});

// Add a request interceptor to include the JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('ruhiya_admin_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
