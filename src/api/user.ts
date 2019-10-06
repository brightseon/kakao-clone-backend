import User from '../models/User';
import { Response } from 'express';
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
        console.log('result : ', result);
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