import Admin from "../models/admin";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import genToken from "../utils/token";

const EXPIRES = parseInt(process.env.COOKIE_EXP!, 10);

export const access = async(req:Request, res:Response, next:NextFunction)=> {
    const { email, password } = req.body;
    try {
        const checkMail = await Admin.findOne({ email });
        if(checkMail) {
            const isMatch = await bcrypt.compare(password, checkMail.password);
            if(isMatch) {
                const token = genToken(checkMail._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: EXPIRES});
                return res.status(200).json({ message: 'Success', data: checkMail._id });
            }
            throw new Error('Incorrect Password')
        }
         throw new Error("Email not found");
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message);
            res.status(404).json({ error: err.message })
        }
    }
    next();
}