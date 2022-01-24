import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";
import config from '../config.js';

const Users = userModel;

export const userLogout = (req, res) => {
    return res.status(200).clearCookie('jwt').json({ message: "Successfully logged out 😏 🍀" });
}

export const getUser = (req, res, next) => {
    Users.find({}).then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(users);
    }, (err) => next(err))
        .catch((err) => next(err));
}

export const userSignup = async (req, res, next) => {

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

}
export const findUser = (req, res, next) => {
    Users.findOne({ 'email': `${req.body.email}` }, 'email password', function (err, user) {
        if (err) return handleError(err);
        res.status(401);
        console.log(' The user with this email %s exist, try creating your email', user.email);
    });/* 
    next() */
}

export const userLogin = async (req, res, next) => {
    //authenticate user

    Users.findOne({ 'email': `${req.body.email}` }, 'email password', function (err, user) {
        if (user == null) {
            return res.status(400).send("Cannot find user with that Email")
        }

        console.log('%s is a %s.', user.email,
            user.password);
        //comparing the saved password with provided one

        try {
            if (bcrypt.compare(req.body.password, user.password)) {
                const userMail = { email: req.body.email };
                //sign the email
                const accessToken = jwt.sign(userMail, config.ACCESS_TOKEN_SECRET);

                res.status(200).cookie('jwt', accessToken, {
                    maxAge: 1000 * 60 * 15, //after 15mini
                    sameSite: 'strict',
                    httpOnly: true
                });

                res.setHeader('Content-Type', 'application/json');
                res.json({ success: true, token: accessToken, status: 'You are successfully logged in!' });
            }
            else {
                res.send('Not allowed');
            }
        }
        catch (error) {
            res.statusCode = 500;
            res.send('Looks like it\'s our problem, we\'ll solve it in no time');
        }
    })

}
