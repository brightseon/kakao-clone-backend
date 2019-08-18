import mongoose, { Schema } from 'mongoose';

const UserSchema : Schema = new mongoose.Schema({
    email : { type : String, required : true },
    username : { type : String, required : true },
    phone_number : { type : String, default : '' },
    status_message : { type : String, default : '' },
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
    create_at : { type : 'ObjectId', default : true, required : Date.now },
    update_at : { type : 'ObjectId', default : true, required : Date.now }
});

const model = mongoose.model('User', UserSchema);

export default model;