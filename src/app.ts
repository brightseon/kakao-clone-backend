import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import { authRoute, userRoute, chatRoute } from './routes';
import authRouter from './routers/authRouter';
import userRouter from './routers/userRouter';
import chatRouter from './routers/chatRouter';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import './passport';

const app = express();

const CookieStore = MongoStore(session);

app.use(cookieParser());
app.use(express.json());
app.use(session({
    secret : process.env.SECRET,
    resave : true,
    saveUninitialized : false,
    store : new CookieStore({
        mongooseConnection : mongoose.connection
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoute.auth, authRouter);
app.use(userRoute.user, userRouter);
app.use(chatRoute.chat, chatRouter);

export default app;