import express from "express";
const Route = express.Router();
import { uploadPhoto } from '../controllers/gallery'
import upload from '../utils/image';

Route.post('/', upload.single('photo'), uploadPhoto);

export default Route;