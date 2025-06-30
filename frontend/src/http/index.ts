import axios from "axios";

const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

/*api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((config)=>{
   return config;
}, (error) => {
    if(error.response.status === 401) {

    }
});*/

export default api;