import { Request } from 'express';
import mongoose from 'mongoose'

export interface IUser {
    email : string;
    name : string;
    phone_number : string;
    status_message : string;
    music : string;
    rooms : IRoom[];
    friends : IUser[];
    create_at : Date;
    update_at : Date;
};

export interface IUserInfoRequest extends Request, IUser {
    user : {
        _id : string;
    };
};

export interface IRoom {
    maker : mongoose.Types.ObjectId;
    participants : IUser[];
    last_message : string;
    member_count : number;
    room_image : string;
    create_at : Date;
    update_at : Date;
}