import express from 'express';
const app = express();
import dotenv, { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import adminRoute from './routes/admin';

//EXPRESS MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// COOKIE MIDDLEWARE
app.use(cookieParser());

// ROUTES MIDDELWARE
app.use('/api/admin', adminRoute);

export default app;