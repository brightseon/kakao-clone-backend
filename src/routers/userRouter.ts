import express from 'express';
import { userRoute } from '../routes';
import { onlyPrivate } from '../middlewares';
import { editUser, getUserDetail } from '../api/user';

const userRouter = express.Router();

userRouter.post(userRoute.editUser, onlyPrivate, editUser);
userRouter.post(userRoute.me, onlyPrivate, getUserDetail);
userRouter.post(userRoute.userDetail, onlyPrivate, getUserDetail);

export default userRouter;