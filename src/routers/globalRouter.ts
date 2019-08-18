import express from 'express';
import { globalRoute } from '../routes';
import { join, login } from '../api/user';

const globalRouter = express.Router();

globalRouter.post(globalRoute.join, join);
globalRouter.post(globalRoute.login, login);

export default globalRouter;