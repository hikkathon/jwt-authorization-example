import { body, query, param, ValidationChain } from 'express-validator';

export const authValidator = {
    registration: (): ValidationChain[] => [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
    ]
};