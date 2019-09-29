import User from '../models/User';
import { Request, Response } from 'express';

export const editUser = (req : Request, res : Response) => {
    console.log(req.user);
    // const { body : { email, name } } = req;

};