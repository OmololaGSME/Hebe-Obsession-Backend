import { Request, Response, NextFunction } from 'express';
import Pic from "../models/gallery";
import cloudinary from '../utils/cloud';

export const allPhotos = async(req:Request, res:Response, next:NextFunction)=> {
    try {
        const getPhotos = await Pic.find();
        res.status(200).json({ data: getPhotos });
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
    }
};

export const singlePhoto = async(req:Request, res:Response, next:NextFunction)=> {
    const { id } = req.params;
    try {
        const onePhoto = await Pic.findById(id);
        if(!onePhoto) {
            throw new Error(`Photo with id ${ id } not found`);
        }
        res.status(200).json({ message: 'Success', data: onePhoto });
    } catch (err) {
        if(err instanceof Error) {
            res.status(404).json({ error: err.message });
        }
    }
}

export const uploadPhoto = async(req:Request, res:Response, next:NextFunction)=> {
    try {
         if(!req.file) {
            throw new Error('No file uploaded.')
        }
        const result = await cloudinary.uploader.upload(req.file.path, { folder: 'gallery' })
        console.log(result.secure_url)
        const createImage = await Pic.create({
            photo: result.secure_url,
            imageId: result.public_id
        });
        res.status(201).json({ message: 'Upload successful', data: createImage });
    } catch (err) {
        if(err instanceof Error) {
            res.status(400).json({ error: err.message });
        }
    }
}