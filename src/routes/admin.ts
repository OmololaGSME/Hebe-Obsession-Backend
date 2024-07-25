import express from 'express';
const Route = express.Router();
import { access, lostPassword, recoverPassword } from '../controllers/admin';

Route.post('/login', access);
Route.post('/forgot-password', lostPassword);
Route.patch('/reset-password/:id', recoverPassword);

export default Route;