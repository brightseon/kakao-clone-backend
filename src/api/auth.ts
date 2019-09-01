import User from '../models/User';
import { Request, Response } from 'express';

export const join = async (req : Request, res : Response) => {
    const { body : { email, name, password, password_confirm } } = req;

    try {
        console.log('email, name, password, password_confirm : ', email, name, password, password_confirm);
        
        if(password !== password_confirm) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : '비밀번호와 비밀번호 확인이 다릅니다.'
            });
        }
        
        const newUser = new User({ email, name });

        await User.register(newUser, password);

        return res.status(200).json({
            ok : true,
            data : newUser,
            error : null
        });
    } catch(err) {
        console.log('join error : ', err.message);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const duplicateCheck = async (req : Request, res : Response) => {
    const { body : { email } } = req;

    try {
        console.log('email : ', email);
        
        return res.status(200);
    } catch(err) {
        console.log('duplicateCheck error : ', err);
    } finally {
        res.end();
    }
};

export const login = (req : Request, res : Response) => {
    try {
        console.log('params : ', req.body);
    } catch(err) {
        console.log('login error : ', err);
    } finally {
        res.end();
    }
};