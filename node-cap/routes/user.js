import express from "express";
//import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import config from "../config.js";

/* const token = sign({ "d": "dd" }, "secret", { expiresIn: 300 })
console.log(token);
const verifycode = verify(token, "secret");
console.log(verifycode); */

const userRouter = express.Router();
userRouter.use(express.json());

const users = [];

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.send(users);
    });


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


            users.push(user);

            res.statusCode = 201;
            res.send(`${req.body.firstname}'s account has been created successfully!`);

        } catch (error) {
            res.statusCode = 500;
            res.send('Looks like it\'s our problem, we\'ll solve it in no time');

        }

    });

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

            res.send(`You have successfully logged in! \n with Token: ${accessToken}`);
        }
        else {
            res.send('Not allowed');
        }
    } catch (error) {
        res.statusCode = 500;
        res.send('Looks like it\'s our problem, we\'ll solve it in no time');
    }
});

userRouter.post('/logout', async (req, res, next) => {

})


export default userRouter;