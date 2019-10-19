import express from 'express';
import { roomRoute } from '../routes';
import { rooms, addRoom } from '../api/room';
import { onlyPrivate } from '../middlewares';

const roomRouter = express.Router();

roomRouter.post(roomRoute.rooms, onlyPrivate, rooms);
roomRouter.post(roomRoute.addRoom, onlyPrivate, addRoom);

export default roomRouter;