import mongoose, { Schema } from 'mongoose';
import { IChatDocument, IChat } from '../types';

const ChatSchema : Schema<IChat> = new mongoose.Schema({
    room : { type : 'ObjectId', ref : 'Room', required : true },
    from : { type : 'ObjectId', ref : 'User', required : true },
    to : { type : 'ObjectId', ref : 'User', required : true },
    content : { type : String, required : true },
    read_count : { type : Number, required : true },
    create_at : { type : Date, default : Date.now, required : true },
    update_at : { type : Date, default : Date.now, required : true }
});

const model = mongoose.model<IChatDocument>('Chat', ChatSchema);

export default model;