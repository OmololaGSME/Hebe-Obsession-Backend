import express from 'express';
const app = express();
import dotenv, { config } from 'dotenv';
config();
import adminRoute from './routes/admin';

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoute);

export default app;