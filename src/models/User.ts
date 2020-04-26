import mongoose, { Schema, PassportLocalSchema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import { IUserDocument, IUser } from '../types';
import migration from '../utils/migration';
mongoose.set('useCreateIndex', true);

const UserSchema : Schema<IUser> = new mongoose.Schema({
    email : { type : String, required : true, unique : true },
    name : { type : String, required : true },
    phone_number : { type : String, default : '' },
    status_message : { type : String, default : '' },
    profile_image : { type : String, default : '' },
    music : { type : String, default : '' },
    favorites : { type : Boolean, default : false },
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

migration(model, 'favorites', false);

export default model;