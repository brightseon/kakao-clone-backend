import { Request } from 'express';

export interface IUser {
    email : string;
    name : string;
    phone_number : string;
    status_message : string;
    music : string;
    rooms : [];
    friends : [];
    create_at : Date;
    update_at : Date;
};

export interface IUserInfoRequest extends Request, IUser {
    user : {
        _id : string;
    };
};