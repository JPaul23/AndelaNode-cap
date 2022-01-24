import express from "express";

import bcrypt from 'bcrypt';
import cookieParser from "cookie-parser";

import config from "../config.js";
import { authorization } from "../Middleware/authentication.js";
import { getUser, findUser, userSignup, userLogin, userLogout } from "../controllers/userController.js";
import userModel from "../models/user.js"; //user model

const userRouter = express.Router();
userRouter.use(express.json());
userRouter.use(cookieParser());


userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get(getUser);

/* ========================SIGNUP======================= */
userRouter
    .post('/signup', findUser, userSignup);

/* ===================LOGIN============================ */
userRouter.post('/login', userLogin);

/* =====================LOGOUT======================= */
userRouter.get('/logout', authorization, userLogout);

export default userRouter;
