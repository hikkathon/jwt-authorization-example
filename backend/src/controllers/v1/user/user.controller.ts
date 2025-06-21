import { NextFunction, Request, Response } from "express";
import { ApiResponseBuilder } from "../../../utils/apiResponse";
import * as userService from '../../../services/user.service'

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usersData = await userService.getUsers();
        ApiResponseBuilder.success(res, {...usersData}, 200);
    } catch (error) {
        next(error);
    }
};