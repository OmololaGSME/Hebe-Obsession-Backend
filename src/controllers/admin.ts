import Admin from "../models/admin";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';

export const access = async(req:Request, res:Response, next:NextFunction)=> {
    const { email, password } = req.body;
    try {
        const checkMail = await Admin.findOne({ email });
        if(checkMail) {
            const isMatch = await bcrypt.compare(password, checkMail.password);
            if(isMatch) {
                return res.status(200).json({ message: 'Success' });
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