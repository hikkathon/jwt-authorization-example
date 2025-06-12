import {Request, Response, NextFunction} from 'express';
import * as authService from '../../../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {username, email, password} = req.body;
        const user = await  authService.register(username, email, password);
        res.status(200).json(user);
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

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

    }catch (error) {
        next(error);
    }
};
