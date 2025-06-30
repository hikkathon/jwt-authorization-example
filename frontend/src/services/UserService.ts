import api from "../http";
// @ts-ignore
import type { AxiosResponse, AxiosXHR } from 'axios';
import type { IUser } from "../models/response/IUser.ts";

export default class UserService {
    static async fetchUsers(): Promise<AxiosXHR<IUser[]>> {
        return api.get('/users');
    }
}