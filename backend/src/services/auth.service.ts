import * as userModel from '../models/user.model';
import * as mailService from './mail.service'
import * as jwtService from "./jwt.service";
import bcrypt from 'bcrypt';
import {User} from "../generated/prisma";
import {API_URL} from '../config/env'
import {NotFoundError} from "../exceptions/NotFoundError";

type UserPublicInfo = Pick<User, 'uuid' | 'email' | 'is_active'>;

export const register = async (email: string, password: string) => {
    const candidate = await userModel.getUserByEmail(email);
    if (candidate) {
        throw new Error('A user with this email already exists');
    }
    const passwordHash = await bcrypt.hash(password, 3);
    const user: User = await userModel.createUser(email, passwordHash);

    await mailService.sendActivationMail(
        email,
        'Активация аккаунта',
        ' ',
        `<div>
             <h1>Для активации перейдите по ссылке</h1>
             <a href="${API_URL}/api/v1/auth/activate/${user.activate_link}">Активировать</a>
         </div>`
    );

    const publicUserInfo: UserPublicInfo = {
        uuid: user.uuid,
        email: user.email,
        is_active: user.is_active
    };
    const tokens = jwtService.generateTokens({...publicUserInfo});

    await jwtService.createAccessToken(user.id, tokens.accessToken)
    await jwtService.createRefreshToken(user.id, tokens.refreshToken)

    return {...publicUserInfo, tokens}
};

export const login = async () => {

};

export const logout = async (id: number) => {

};

export const activate = async (activationLink: string) => {
    const user = await userModel.getUserByActivationLink(activationLink);

    if (!user) {
        throw new NotFoundError('User not found');
    }

    if (user.is_active) {
        throw new Error('User is already activated');
    }

    user.is_active = true;
    user.updated_at = new Date();
    await userModel.updateUser(user.id, user);
};

export const refreshToken = async (id: number, username: string) => {

};

export const setAuthCookies = (res: { cookie: Function }, refreshToken: string) => {
    res.cookie('refreshToken', refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    });
};