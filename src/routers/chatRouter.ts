import express from 'express';
import { chatRoute } from '../routes';
import { chats } from '../api/chat';

const chatRouter = express.Router();

chatRouter.post(chatRoute.chats, chats);

export default chatRouter;