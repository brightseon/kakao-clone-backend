import mongoose, { Schema } from 'mongoose';
import { IFileDocument, IFile } from '../types';

const FilesSchema : Schema<IFile> = new mongoose.Schema({
    from : { type : 'ObjectId', ref : 'User', required : true },
    room : { type : 'ObjectId', ref : 'Room', required : true },
    file_url : { type : String, required : true },
    create_at : { type : Date, default : Date.now, required : true }
});

const model = mongoose.model<IFileDocument>('Files', FilesSchema);

export default model;