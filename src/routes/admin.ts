import express from 'express';
const Route = express.Router();
import { access, lostPassword, recoverPassword } from '../controllers/admin';
import validatePassword from '../utils/validation';

Route.post('/login', access);
Route.post('/forgot-password', lostPassword);
Route.patch('/reset-password/:id', validatePassword, recoverPassword);

export default Route;