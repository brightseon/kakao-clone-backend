import mongoose, { Schema } from 'mongoose';

const FilesSchema : Schema = new mongoose.Schema({
    from : { type : 'ObjectId', ref : 'User', required : true },
    room : { type : 'ObjectId', ref : 'Room', required : true },
    file_url : { type : String, required : true },
    create_at : { type : Date, default : Date.now, required : true }
});

const model = mongoose.model('Files', FilesSchema);

export default model;