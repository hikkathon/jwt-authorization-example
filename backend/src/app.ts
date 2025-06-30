import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/error.handler';
import apiRoutes from './routes/index';
import { APP_URL } from './config/env'
import { ApiResponseBuilder } from "./utils/apiResponse";
import { getErrorMessage } from "./utils/getErrorMessage";

const app = express();

app.use(express.json());
app.use(cors(
    {
        credentials: true,
        origin: APP_URL,
    }
));
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

// Обработка 404
app.use((req: Request, res: Response, next: NextFunction) => {
    ApiResponseBuilder.error(
        res,
        'NOT_FOUND',
        'Not Found',
        404
    );
});

app.use(errorHandler);

export default app;
