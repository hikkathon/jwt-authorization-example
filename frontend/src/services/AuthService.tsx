import api from "../http";
// @ts-ignore
import type { AxiosResponse } from 'axios';
import type { AuthResponseType } from "../hooks/UseAuth.ts";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponseType>> {
        return await api.post('/auth/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponseType>>{
        const request = await api.post('/auth/registration', {email, password});
        return request.data;
    }

    static async logout() {
        // @ts-ignore
        return await api.post('/auth/logout');
    }
}