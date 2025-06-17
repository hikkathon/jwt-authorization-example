import {Request, Response, NextFunction} from 'express';
import * as authService from '../../../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email, password} = req.body;
        const candidate = await authService.register(email, password);
        res.cookie('refreshToken', candidate.tokens.refreshToken, { maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true, secure: true });
        res.status(200).json(candidate);
    }catch (error) {
        next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }catch (error) {
        next(error);
    }
};

export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }catch (error) {
        next(error);
    }
};
