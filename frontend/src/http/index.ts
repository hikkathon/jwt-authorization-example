import axios from "axios";

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

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Здесь должна быть логика обработки 401 ошибки
            // Например:
            // - Попытка обновить токен
            // - Перенаправление на страницу входа
            // - Очистка localStorage
            console.error('Unauthorized!', error);

            // Пример: удаляем невалидные данные аутентификации
            localStorage.removeItem('auth-storage');

            // Можно перенаправить на страницу входа
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;