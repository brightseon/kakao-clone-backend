import express from 'express';
import { globalRoute } from './routes';
import globarRouter from './routers/globalRouter';

const app = express();

app.use(express.json());
app.use(globalRoute.home, globarRouter);

export default app;