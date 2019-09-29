import express from 'express';
import { authRoute } from '../routes';
import { join, duplicateCheck, login, logout, passportLogin } from '../api/auth';
import { onlyPublic, onlyPrivate } from '../middlewares';

const authRouter = express.Router();

authRouter.post(authRoute.join, onlyPublic, join);
authRouter.post(authRoute.duplicateCheck, onlyPublic, duplicateCheck);
authRouter.post(authRoute.login, onlyPublic, passportLogin, login);
authRouter.post(authRoute.logout, onlyPrivate, logout);

export default authRouter;