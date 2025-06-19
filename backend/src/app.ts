import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.middleware';
import apiRoutes from "./routes/index";
import {ApiResponseBuilder} from "./utils/apiResponse";
import {errorHandler} from "./middlewares/error.handler";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

// Обработка 404
app.use((req, res) => {
    ApiResponseBuilder.error(
        res,
        'NOT_FOUND',
        'Resource not found',
        404
    );
});

app.use(errorHandler);

// Error handling middleware
// app.use(errorMiddleware);

export default app;