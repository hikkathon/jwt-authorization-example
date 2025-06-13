import dotenv from 'dotenv'
import jwt from "jsonwebtoken";

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET;