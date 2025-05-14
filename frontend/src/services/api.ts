// frontend/src/services/api.ts
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

const apiClient = axios.create({
    baseURL: API_URL,
    withCredentials: true, 
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});



export default apiClient;