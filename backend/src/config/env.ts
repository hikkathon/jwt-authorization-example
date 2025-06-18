import dotenv from 'dotenv'

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const API_URL = process.env.API_URL;
export const APP_URL = process.env.CLIENT_URL;
export const SMTP_CONFIG = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    from: process.env.SMTP_FROM,
    secure: false, // true для порта 465
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
    authMethod: 'PLAIN'
};