import User from '../models/User';
import { Request, Response } from 'express';
import { IUserInfoRequest } from '../types';

export const editUser = async (req : IUserInfoRequest, res : Response) => {
    try {
        const { body : { email, name, phone_number, status_message, music }, user : { _id } } = req;
        console.log('email, name, phone_number, status_message, music : ', email, name, phone_number, status_message, music);

        if(name.length > 10) throw Error('유저 이름이 너무 깁니다(10자 이내).');

        if(status_message.length > 20) throw Error('상태메시지가 너무 깁니다(20자 이내).');

        const result = await User.findByIdAndUpdate({ _id }, {
            name,
            phone_number,
            status_message,
            music
        });
        
        return res.status(200).json({
            ok : true,
            data : result,
            error : null
        });
    } catch(err) {
        console.log('editUser error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const getUserDetail = async (req : Request, res : Response) => {
    try {
        const { params : { username : name }, body : { email } } = req;
        const findUser = await User.find({ name, email });
        
        if(findUser.length === 0) throw Error('해당 이름의 유저가 존재하지 않습니다.');
        
        return res.status(200).json({
            ok : true,
            data : findUser[0],
            error : null
        });
    } catch(err) {
        console.log('getUserDetail error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const getFriends = async (req : Request, res : Response) => {
    try {
        const { body : { email } } = req;
        const userInfo = await User.find({ email });
        const friends = userInfo[0].friends;

        return res.status(200).json({
            ok : true,
            data : friends,
            error : null
        });
    } catch(err) {
        console.log('getFriends error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};