import express, { Router } from 'express';
const Route = express.Router();
import { access, lostPassword } from '../controllers/admin';

Route.post('/login', access);
Route.post('/forgot-password', lostPassword);

export default Route;