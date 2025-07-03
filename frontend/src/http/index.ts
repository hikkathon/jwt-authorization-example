import axios from "axios";
import type { AuthResponse } from "../models/response/AuthResponse";

type AuthState = {
    state: {
        isAuth: boolean;
        accessToken: string;
        email: string;
    };
    version: number;
};

const API_URL = "http://localhost:3000/api/v1";

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const authStorage = localStorage.getItem('auth-storage');

    if (authStorage) {
        try {
            const authState: AuthState = JSON.parse(authStorage);
            const token = authState?.state?.accessToken;

            if (token) {
                config.headers = config.headers || {};
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error('Error parsing auth storage', error);
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalResponse = await error.config;
    if (error.response?.status === 401) {
        const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh-token`, {withCredentials: true});
        console.log(response);
        localStorage.setItem('AT', response.data.accessToken);
        return api.request(originalResponse);
    }
});

export default api;