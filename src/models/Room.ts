import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    last_message : { type : 'ObjectId', ref : 'Chat', required : true },
    member_count : { type : Number, required : true },
    create_at : { type : Date, default : Date.now, required : true },
    update_at : { type : Date, default : Date.now, required : true }
});

const model = mongoose.model('Room', RoomSchema);

export default model;