import jwt, { VerifyErrors, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// ADMIN AUTH
const adminAuth = (req:Request, res:Response, next: NextFunction)=> {
    const token: string = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_ADMIN!, (err:VerifyErrors | null, decoded?: object | string)=> {
            if(err) {
                res.status(401).json({error: 'Invalid token'});
            } else {
                console.log(decoded);
                next()
            }
        });
    } else {
        res.status(401).json({error: 'No token, authorization denied'});
    }
}

export default adminAuth ;