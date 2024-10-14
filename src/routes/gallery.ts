import express from "express";
const Route = express.Router();
import { uploadPhoto, allPhotos, singlePhoto } from '../controllers/gallery'
import upload from '../utils/image';

Route.post('/', upload.single('photo'), uploadPhoto);
Route.get('/', allPhotos);
Route.get('/:id', singlePhoto);

export default Route;