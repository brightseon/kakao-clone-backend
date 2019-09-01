import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { authRoute } from './routes';
import authRouter from './routers/authRouter';
import './passport';

const app = express();

app.use(cookieParser());
app.use(session({
    secret : process.env.SECRET,
    resave : true,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(authRoute.auth, authRouter);

export default app;