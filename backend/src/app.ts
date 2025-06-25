import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { NotFoundError } from './exceptions/NotFoundError';
import { errorHandler } from './middlewares/error.handler';
import apiRoutes from './routes/index';

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

// Обработка 404
app.use((req: Request, res: Response, next: NextFunction) => {
	next(NotFoundError);
});

app.use(errorHandler);

export default app;
