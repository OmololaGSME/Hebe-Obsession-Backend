import express, { Request, Response } from 'express';
const Route = express.Router();

Route.get('/', (req:Request, res:Response)=> {
    res.status(200).send({ data: 'Server is working...' });
});

export default Route;