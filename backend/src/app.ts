import express, {NextFunction, Request, Response} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import apiRoutes from "./routes/index";
import {errorHandler} from "./middlewares/error.handler";
import {NotFoundError} from "./exceptions/NotFoundError";

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