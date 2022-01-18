import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
//import cookieParser from "cookie-parser";

import config from "../config.js";
import { verifyCookie } from "../Middleware/authentication.js";
import { getLogout } from "../controllers/userController.js";
import userModel from "../models/user.js"; //user model

const userRouter = express.Router();
userRouter.use(express.json());
const Users = userModel;

//const users = [];

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        Users.find({}).then((users) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(users);
        }, (err) => next(err))
            .catch((err) => next(err));
    });

/* ========================SIGNUP======================= */
userRouter
    .post('/signup', async (req, res, next) => {

        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10); //salt gen & hash the password.

            const user = {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword
            }; //store the hashed password


            Users.create(user).then((user) => {
                console.log(` ${user.firstname}'s account has been created successfully!`);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user)
            }, (err) => next(err))
                .catch((err) => next(err));


        } catch (error) {
            res.statusCode = 500;
            res.send('Looks like it\'s our problem, we\'ll solve it in no time');

        }

    });

/* ===================LOGIN============================ */
userRouter.post('/login', async (req, res, next) => {
    //authenticate user
    const user = users.find(user => user.email == req.body.email);
    if (user == null) {
        return res.status(400).send("Cannot find user with that Email")
    }
    //comparing the saved password with provided one
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const userMail = { email: req.body.email };
            //sign the email
            const accessToken = jwt.sign(userMail, config.ACCESS_TOKEN_SECRET);

            res.cookie("session_id", accessToken, { httpOnly: true, maxAge: 600 })
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json({ success: true, token: accessToken, status: 'You are successfully logged in!' });
        }
        else {
            res.send('Not allowed');
        }
    } catch (error) {
        res.statusCode = 500;
        res.send('Looks like it\'s our problem, we\'ll solve it in no time');
    }
});

/* =====================LOGOUT======================= */
userRouter.get('/logout', verifyCookie, (req, res,) => {
    return res
        //.clearCookie("session_id")
        .status(200)
        .json({ message: "Successfully logged out 😏 🍀" });
}); //getLogout controller


export default userRouter;