import Chat from '../models/Chat';
import { Request, Response } from 'express';
import { checkValidate } from '../utils';

export const chats = async (req : Request, res : Response) => {
    try {
        const { body : { chat_id } } = req;
        const notProperty = checkValidate(req, ['chat_id']);

        if(notProperty) return res.status(400).json({
            ok : false,
            data : null,
            error : `필수 파라미터인 '${ notProperty }'가 존재하지 않습니다.`
        });

    } catch(err) {
        console.log('chats error : ', err);

        return res.status(500).json({
            ok : true,
            data : null,
            error : err.message
        });
    } finally {
        res.end();
    }
};