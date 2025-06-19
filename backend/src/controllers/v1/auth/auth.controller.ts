import {Request, Response, NextFunction} from 'express';
import {validationResult} from 'express-validator';
import * as authService from '../../../services/auth.service';
import {ApiResponseBuilder} from '../../../utils/apiResponse';
import {getErrorMessage} from "../../../utils/getErrorMessage";

export const registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            ApiResponseBuilder.error(
                res,
                'USER_VALIDATION_FAILED',
                'Failed to validation user',
                401,
                getErrorMessage(errors)
            );
        }

        const {email, password} = req.body;
        const candidate = await authService.register(email, password);
        res.cookie('refreshToken', candidate.tokens.refreshToken, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: true
        });
        ApiResponseBuilder.success(res, candidate, 200);
    } catch (error) {
        ApiResponseBuilder.error(
            res,
            'USER_REGISTRATION_FAILED',
            'Failed to registration user',
            500,
            getErrorMessage(error)
        );
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
};

export const activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const activateLink = req.params.link;
        await authService.activate(activateLink);
        res.status(200).json({ok: true});
    } catch (error) {
        next(error);
    }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        next(error);
    }
};
