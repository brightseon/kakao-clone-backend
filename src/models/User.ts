import mongoose, { Schema, PassportLocalSchema, Document } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { IUser } from '../types';
mongoose.set('useCreateIndex', true);

interface IUserDocument extends Document, IUser {};

const UserSchema : Schema = new mongoose.Schema({
    email : { type : String, required : true, unique : true },
    name : { type : String, required : true },
    phone_number : { type : String, default : '' },
    status_message : { type : String, default : '' },
    profile_image : { type : String, default : '' },
    music : { type : String, default : '' },
    rooms : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Room'
        }
    ],
    friends : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'User'
        }
    ],
    create_at : { type : Date, required : true, default : Date.now },
    update_at : { type : Date, required : true, default : Date.now }
});

UserSchema.plugin(passportLocalMongoose, {
    usernameField : 'email'
});

const model = mongoose.model<IUserDocument>('User', UserSchema as PassportLocalSchema);

export default model;