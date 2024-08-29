import { Request, Response, NextFunction } from 'express';
import  { MulterError } from 'multer';

function imageErrorHandler(err:MulterError, req:Request, res:Response, next:NextFunction) {
    if(err instanceof MulterError) {
        console.log(err.message)
        return res.status(400).json({ error: err.message });
    } else {
        next(err);
    }
}

export default imageErrorHandler;