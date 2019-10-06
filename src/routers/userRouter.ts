import express from 'express';
import { userRoute } from '../routes';
import { onlyPrivate } from '../middlewares';
import { editUser, getUserDetail, getFriends } from '../api/user';

const userRouter = express.Router();

userRouter.post(userRoute.editUser, onlyPrivate, editUser);
userRouter.post(userRoute.me, onlyPrivate, getUserDetail);
userRouter.post(userRoute.getFreinds, onlyPrivate, getFriends);
userRouter.post(userRoute.userDetail, onlyPrivate, getUserDetail);

export default userRouter;