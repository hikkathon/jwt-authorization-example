import dotenv from 'dotenv'
import {SmtpConfig} from "../types/smtp.type";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;
export const API_URL:string = process.env.API_URL || 'http://localhost:3000';
export const APP_URL:string = process.env.APP_URL || 'http://localhost:5000';
export const SMTP_CONFIG: SmtpConfig = {
    host: process.env.SMTP_HOST as string,
    port: parseInt(process.env.SMTP_PORT as string, 10),
    from: process.env.SMTP_FROM as string,
    secure: false, // true для порта 465
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASS as string,
    },
    authMethod: 'PLAIN'
};