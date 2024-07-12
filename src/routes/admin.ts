import express, { Router } from 'express';
const Route = express.Router();
import { access } from '../controllers/admin';

Route.post('/login', access);

export default Route;