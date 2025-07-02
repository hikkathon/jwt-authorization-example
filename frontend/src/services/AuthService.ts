// AuthService.ts
import api from "../http";
// @ts-ignore
import type { AxiosResponse } from "axios";
import type { AuthResponseType } from "../hooks/UseAuth";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        const response = await api.post('/auth/registration', { email, password });
        return response.data;
    }

    static async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    }

    static async checkAuth(): Promise<AuthResponseType> {
        const response = await api.get<AuthResponseType>('/auth/refresh-token');
        return response.data;
    }
}
