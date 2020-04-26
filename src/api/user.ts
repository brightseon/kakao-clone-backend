import User from '../models/User';
import { Request, Response } from 'express';
import { IUserInfoRequest } from '../types';
import { checkValidate } from '../utils';

export const editUser = async (req : IUserInfoRequest, res : Response) => {
    try {
        const { body : { user_id, name, phone_number, status_message, music } } = req;

        const notProperty = checkValidate(req.body, ['user_id']);

        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 없습니다.`
        });

        if(name.length > 10) throw Error('유저 이름이 너무 깁니다(10자 이내).');

        if(status_message.length > 20) throw Error('상태메시지가 너무 깁니다(20자 이내).');

        const result = await User.findByIdAndUpdate(user_id, {
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

        const notProperty = checkValidate({ ...req.params, ...req.body }, ['username', 'email']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }

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
        const defaultLimit = 50;
        let defaultPage = 1;
        const { body : { email, page } } = req;

        const notProperty = checkValidate(req.body, ['email']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }

        if(page) defaultPage = page;

        const findUser = await User.findOne({ email });

        if(findUser) {
            const friendsId = findUser.friends.slice(
                defaultLimit * (defaultPage - 1),
                defaultLimit * defaultPage
            );

            const friends = await Promise.all(friendsId.map(id => {
                console.log(User.findById(id));
                return User.findById(id).where('favorites').equals(false)
            }
            ));

            console.log(friends);
    
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
        const { body : { me_id, friend_id } } = req;
        const notProperty = checkValidate(req.body, ['me_id', 'friend_id']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }

        const findUser = await User.findOne({ _id : friend_id });
        
        if(findUser) {
            const result = await User.findByIdAndUpdate(me_id, { $push : { friends : friend_id } });
            await User.findByIdAndUpdate(friend_id, { $push : { friends : me_id } });
    
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
        const { body : { me_id, friend_id }} = req;
        const notProperty = checkValidate(req.body, ['me_id', 'friend_id']);

        if(notProperty) {
            return res.status(400).json({
                ok : false,
                data : null,
                error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
            });
        }

        const result = await User.findByIdAndUpdate(me_id, { $pull : { 'friends' : friend_id }});
        await User.findByIdAndUpdate(friend_id, { $pull : { friends : me_id } });

        return res.status(200).json({
            ok : true,
            data : result,
            error : null
        });
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