import express from 'express';
import { authRoute } from '../routes';
import { join, duplicateCheck, login } from '../api/auth';

const authRouter = express.Router();

authRouter.post(authRoute.join, join);
authRouter.post(authRoute.duplicateCheck, duplicateCheck);
authRouter.post(authRoute.login, login);

export default authRouter;