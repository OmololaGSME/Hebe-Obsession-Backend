import multer, { diskStorage, FileFilterCallback } from "multer";
import path from 'path'
import { Request } from "express";

type FileCallback = (error:Error | null, filename:string)=> void;
type DestinationCallback = (error:Error | null, destination:string)=> void;


const storage = diskStorage({
    filename: (req:Request, file:Express.Multer.File, cb:FileCallback) => {
        const filename = `${ file.fieldname }_${ Date.now() }${ path.extname(file.originalname) }`
        cb(null, filename);
    }
});

const fileFilter = (req:Request, file:Express.Multer.File, cb:FileFilterCallback)=> {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else {
        cb(null, false);
    }
}

const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter,
});

export default upload;