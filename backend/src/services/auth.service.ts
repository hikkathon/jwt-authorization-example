import * as userModel from '../models/user.model';
import * as mailService from './mail.service'
import * as jwtService from "./jwt.service";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import ApiError from '../utils/apiError';
import {User} from "../generated/prisma";

type UserPublicInfo = Pick<User, 'uuid' | 'email' | 'is_active'>;

export const register = async (email: string, password: string) => {
    const candidate = await userModel.getUserByEmail(email);
    if (candidate) {
        throw new ApiError(400, 'A user with this email already exists');
    }
    if(password.length < 8){
        throw new ApiError(400, 'Password must be at least 8 characters long');
    }
    const passwordHash = await bcrypt.hash(password, 3);
    const activationLink = uuidv4();
    const user:User = await userModel.createUser(email, passwordHash);

    await mailService.sendActivationMail(email,activationLink);

    const publicUserInfo: UserPublicInfo = {
        uuid: user.uuid,
        email: user.email,
        is_active: user.is_active
    };
    const tokens = jwtService.generateTokens({...publicUserInfo});

    await jwtService.createAccessToken(user.id, tokens.accessToken)
    await jwtService.createRefreshToken(user.id, tokens.refreshToken)

    return{...publicUserInfo, tokens}
};

export const login = async () => {

};

export const logout = async (id: number) => {

};

export const refreshToken = async (id: number, username: string) => {

};