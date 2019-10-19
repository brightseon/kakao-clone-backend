import User from '../models/User';
import Room from '../models/Room';
import { Request, Response } from 'express';
import { checkValidate } from '../utils';

export const rooms = async (req : Request, res : Response) => {
    try {
        const defaultLimit = 50;
        let defaultPage = 1;
        const { body : { user_id, page } } = req;
        const notProperty = checkValidate(req.body, ['user_id']);

        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
        });

        if(page) defaultPage = page;

        const user = await User.findById(user_id);

        if(!user) return res.status(400).json({
            ok : false,
            data : null,
            error : '해당 유저가 존재하지 않습니다.'
        });

        const rooms = await Promise.all(user.rooms.map(id => (
            Room.findById(id).skip(defaultLimit * (defaultPage - 1)).limit(defaultLimit * defaultPage)
        )));
        
        return res.status(200).json({
            ok : true,
            data : rooms,
            error : null
        });
    } catch(err) {
        console.log('rooms error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const addRoom = async (req : Request, res : Response) => {
    try {
        const { body : { maker, participants, room_image, chat_name } } = req;
        const notProperty = checkValidate(req.body, ['maker', 'participants']);

        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
        });

        const room = await Room.create({ 
            maker,
            participants,
            room_image,
            name : chat_name,
            member_count : participants.length
        });

        await Promise.all(
            participants.map(participant => User.findByIdAndUpdate(participant, {
                $push : { rooms : room._id }
            }))
        );

        return res.status(200).json({
            ok : true,
            data : room,
            error : null
        });
    } catch(err) {
        console.log('addRoom error :', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const editRoom = async (req : Request, res : Response) => {
    try {
        const { body : { room_id, room_name, room_image } } = req;
        const notProperty = checkValidate(req.body, ['room_id']);
        
        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
        });

        const result = await Room.findByIdAndUpdate(room_id, {
            name : room_name,
            room_image
        });
        
        return res.status(200).json({
            ok : true,
            data : result,
            error : null
        });
    } catch(err) {
        console.log('editRoom error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};

export const deleteRoom = async (req : Request, res : Response) => {
    try {
        const { body : { room_id } } = req;
        const notProperty = checkValidate(req.body, ['room_id']);

        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
        });

        const result = await Room.findById(room_id);
        const participants = (await Room.findById(room_id)).participants;

        await Promise.all(
            participants.map(participant => User.findByIdAndUpdate(participant, { $pull : { rooms : room_id } }))
        );

        return res.status(200).json({
            ok : false,
            data : result,
            error : null
        });
    } catch(err) {
        console.log('deleteRoom error : ', err);

        return res.status(500).json({
            ok : false,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};