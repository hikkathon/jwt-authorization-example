import * as userModel from '../models/user.model';
import {User} from '../generated/prisma';
import ApiError from '../utils/apiError';

export const register = async (username: string, email: string, password_hash: string): Promise<User> => {
    const candidate = await userModel.getUserByEmail(email);
    if (candidate) {
        throw new ApiError(400, 'A user with this email already exists');
    }

    return userModel.createUser(username, email, password_hash);
};

export const login = async () => {

};

export const logout = async (id: number) => {

};

export const refreshToken = async (id: number, username: string) => {

};