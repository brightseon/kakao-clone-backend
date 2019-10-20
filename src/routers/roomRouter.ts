import express from 'express';
import { roomRoute } from '../routes';
import { rooms, addRoom, editRoom, deleteRoom, room } from '../api/room';
import { onlyPrivate } from '../middlewares';

const roomRouter = express.Router();

roomRouter.post(roomRoute.rooms, onlyPrivate, rooms);
roomRouter.post(roomRoute.addRoom, onlyPrivate, addRoom);
roomRouter.post(roomRoute.editRoom, onlyPrivate, editRoom);
roomRouter.post(roomRoute.deleteRoom, onlyPrivate, deleteRoom);
roomRouter.post(roomRoute.getRoom, onlyPrivate, room);

export default roomRouter;