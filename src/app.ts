import express from 'express';
const app = express();
import dotenv, { config } from 'dotenv';
config();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

export default app;