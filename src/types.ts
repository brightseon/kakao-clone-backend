import { Request } from 'express';
import mongoose, { Document } from 'mongoose'

export interface IUser {
    email : string;
    name : string;
    phone_number : string;
    status_message : string;
    music : string;
    favorites : boolean;
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

export interface IChat {
    room : string;
    from : string;
    to : string;
    content : string;
    read_count : number;
    create_at : Date;
    update_at : Date;
};

export interface IFile {
    from : string;
    room : string;
    file_url : string;
    create_at : string;
};

export interface IUserDocument extends Document, IUser {};
export interface IChatDocument extends Document, IChat {};
export interface IFileDocument extends Document, IFile {};
export interface IRoomDocument extends Document, IRoom {};

export type AllDocuments = IUserDocument | IChatDocument | IFileDocument | IRoomDocument;