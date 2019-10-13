import User from '../models/User';
import { Request, Response } from 'express';
import { IUserInfoRequest } from '../types';
import { ObjectId } from 'bson';

export const editUser = async (req : IUserInfoRequest, res : Response) => {
    try {
        const { params : { id : _id }, body : { email, name, phone_number, status_message, music } } = req;
        console.log('email, name, phone_number, status_message, music : ', email, name, phone_number, status_message, music);

        if(name.length > 10) throw Error('유저 이름이 너무 깁니다(10자 이내).');

        if(status_message.length > 20) throw Error('상태메시지가 너무 깁니다(20자 이내).');

        const result = await User.findOneAndUpdate({ _id }, {
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
        const findUser = await User.findOne({ name, email });
        
        if(!findUser) throw Error('해당 이름의 유저가 존재하지 않습니다.');
        
        return res.status(200).json({
            ok : true,
            data : findUser,
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
        const findUser = await User.findOne({ email });

        if(findUser) {
            const friends = findUser.friends;
    
            return res.status(200).json({
                ok : true,
                data : friends,
                error : null
            });
        } else {
            return res.status(400).json({
                ok : false,
                data : null,
                error : '해당 유저가 존재하지 않습니다.'
            });
        }
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

export const addFriend = async (req : Request, res : Response) => {
    try {
        const { body : { me , friend } } = req;
        const findUser = await User.findOne({ _id : friend });
        
        if(findUser) {
            const result = await User.findOneAndUpdate({ _id : me }, { $push : { friends : findUser } });
    
            return res.status(200).json({
                ok : true,
                data : result,
                error : null
            });
        } else {
            return res.status(400).json({
                ok : false,
                data : null,
                error : '존재하지 않는 유저입니다.'
            });
        }
    } catch(err) {
        console.log('addFriend error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const deleteFriend = async (req : Request, res : Response) => {
    try {
        const { body : { me, friend }} = req;
        const findUser = await User.findById(me);

        if(findUser) {
            const result = await User.findByIdAndUpdate(me, { $pull : { 'friends' : friend }});

            return res.status(200).json({
                ok : true,
                data : result,
                error : null
            });
        } else {
            return res.status(400).json({
                ok : false,
                data : null,
                error : '유저가 존재하지 않습니다.'
            });
        }
    } catch(err) {
        console.log('deleteFriend error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};