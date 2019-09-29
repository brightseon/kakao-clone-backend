import express from 'express';
import { userRoute } from '../routes';
import { onlyPrivate } from '../middlewares';
import { editUser } from '../api/user';

const userRouter = express.Router();

userRouter.post(userRoute.editUser, onlyPrivate, editUser);

export default userRouter;