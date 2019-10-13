import mongoose, { Schema } from 'mongoose';

const ChatSchema : Schema = new mongoose.Schema({
    room : { type : 'ObjectId', ref : 'Room', required : true },
    from : { type : 'ObjectId', ref : 'User', required : true },
    to : { type : 'ObjectId', ref : 'User', required : true },
    content : { type : String, required : true },
    read_count : { type : Number, required : true },
    create_at : { type : Date, default : Date.now, required : true },
    update_at : { type : Date, default : Date.now, required : true }
});

const model = mongoose.model('Chat', ChatSchema);

export default model;