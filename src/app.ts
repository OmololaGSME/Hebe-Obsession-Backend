import express from 'express';
const app = express();
import { config } from 'dotenv';
config();
import cookieParser from 'cookie-parser';
import imageErrorHandler from './middleware/imageError';
import adminRoute from './routes/admin';
import galleryRoute from './routes/gallery';

//EXPRESS MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// COOKIE MIDDLEWARE
app.use(cookieParser(process.env.COOKIE_KEY));

// ROUTES MIDDELWARE
app.use('/api/admin', adminRoute);
app.use('/api/gallery', galleryRoute)
// ERROR MIDDLEWARE
app.use(imageErrorHandler)

export default app;