import api from "../http";
// @ts-ignore
import type { AxiosXHR } from 'axios';

export default class AuthService {
    static async login(email: string, password: string) {
        return await api.post('/auth/login', {email, password});
    }

    static async registration(email: string, password: string): Promise<AxiosXHR> {
        const request = await api.post('/auth/registration', {email, password});
        return request.data;
    }

    static async logout() {
        // @ts-ignore
        return await api.post('/auth/logout');
    }
}