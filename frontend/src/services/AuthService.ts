import api from "../http";
// @ts-ignore
import axios, { type AxiosResponse } from "axios";
import type { AuthResponseType } from "../hooks/UseAuth";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        const response = await api.post('/auth/login', {email, password});
        return response.data;
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        const response = await api.post('/auth/registration', {email, password});
        return response.data;
    }

    static async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    }

    // @ts-ignore
    static async checkAuth(): Promise<AuthResponseType> {
        try {
            const response = await axios.get<AuthResponseType>('http://localhost:3000/api/v1/auth/refresh-token', {withCredentials: true});
            return response.data;
        } catch (error) {
            // @ts-ignore
            console.error(error.response.data);
        }
        //const response = await api.get<AuthResponseType>('/auth/refresh-token');
        //return response.data;
    }
}
