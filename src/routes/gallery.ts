import express from "express";
const Route = express.Router();
import { uploadPhoto, allPhotos } from '../controllers/gallery'
import upload from '../utils/image';

Route.post('/', upload.single('photo'), uploadPhoto);
Route.get('/', allPhotos);

export default Route;