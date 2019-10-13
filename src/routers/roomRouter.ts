import express from 'express';
import { roomRoute } from '../routes';
import { rooms } from '../api/room';

const roomRouter = express.Router();

roomRouter.post(roomRoute.rooms, rooms);

export default roomRouter;