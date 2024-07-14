import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongoose';

const genToken = (id: ObjectId)=> {
    return jwt.sign({ id }, process.env.JWT_ADMIN!, { expiresIn: process.env.EXPIRES_IN })
}

export default genToken;