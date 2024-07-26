import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

const validatePassword = 
[
    body('password').isStrongPassword({ minLowercase: 1, minUppercase: 1, minSymbols: 0, minLength: 6, minNumbers: 1 }).withMessage('Password must have minimum of 6 characters and a combination of lowercase, uppercase and a number'),
    (req:Request, res:Response, next:NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array().map( error => error.msg) });
        }
        return next();
    }
];

export default validatePassword;