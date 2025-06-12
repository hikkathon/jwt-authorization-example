import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import errorMiddleware from './middlewares/error.middleware';
import apiRoutes from "./routes/index";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use('/api', apiRoutes);

// Error handling middleware
app.use(errorMiddleware);

export default app;