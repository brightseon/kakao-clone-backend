import dotenv from 'dotenv';
dotenv.config();
import socketIO, { Socket } from 'socket.io';
import app from './app';
import socketController from './socketController';
import './db';
import './models/User';
import './models/Chat';
import './models/Files';
import './models/Room';

const PORT = process.env.PORT || 4000;

const handleListening = () => 
    console.log(`✅   Server running : http://localhost:${ PORT }`);

const server = app.listen(PORT, handleListening);

const io = socketIO.listen(server);

io.on('connect', (socket : Socket) => socketController(socket, io));