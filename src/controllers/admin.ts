import Admin from "../models/admin";
import { Request, Response, NextFunction } from "express";
import bcrypt from 'bcrypt';
import { genToken, resetToken } from "../utils/token";
import emailSender from "../utils/mail";

const EXPIRES = parseInt(process.env.COOKIE_EXP!, 10);
const EXP_TIME = parseInt(process.env.RESET_COOK_EXP!, 10);

export const access = async(req:Request, res:Response, next:NextFunction)=> {
    const { email, password } = req.body;
    try {
        const checkMail = await Admin.findOne({ email });
        if(checkMail) {
            const isMatch = await bcrypt.compare(password, checkMail.password);
            if(isMatch) {
                const token = genToken(checkMail._id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: EXPIRES});
                return res.status(200).json({ message: 'Successful Login', data: checkMail._id });
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

export const lostPassword = async(req:Request, res:Response, next:NextFunction)=> {
    const { email } = req.body;
    try {
        const findMail = await Admin.findOne({ email });
        if(!findMail) {
            throw new Error('Email not found');
        }
        const token = resetToken(findMail._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: EXP_TIME });
        const mailOptions = {
            from: `Support Team @ ${process.env.EMAIL_SENDER}`,
            to: `${ findMail }`,
            subject: 'Reset Password',
            html: `<h2>Please Click on the link below for password reset. This link expires after 5 minutes <br> <a href="http://localhost:8500/api/admin/reset-password/${ findMail._id }">${ token }</a></h2>`
        }
        await emailSender(mailOptions);
        res.status(200).json({ message: 'Email sent' });
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message);
            res.status(404).json({ error: err.message })
        }
    }
}

export const recoverPassword = async(req:Request, res:Response, next:NextFunction)=> {
    const { id } = req.params;
    const { password } = req.body;
    const { jwt } = req.cookies
    try {
        const encryptPassword = await bcrypt.hash(password, 12);
        if(jwt) {
            const updatePassword = await Admin.findByIdAndUpdate(id, { password: encryptPassword }, { new: true });
            return res.status(200).json({ message: 'Password updated' });
        }
        throw new Error('Expired token');
    } catch (err) {
        if(err instanceof Error) {
            console.log(err.message);
            res.status(403).json({ error: err.message })
        }
    }
}