import { body, query, param, ValidationChain } from 'express-validator';

export const authValidator = {
    registration: (): ValidationChain[] => [
        body('email').isEmail().withMessage('Invalid email'),
        body('password')
            .isString()
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters'),
    ],
    activation: (): ValidationChain[] => [
        param('link').isUUID().withMessage('Invalid activation link'),
    ]
};