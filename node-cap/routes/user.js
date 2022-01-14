import express from "express";
import bodyParser from "body-parser";

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.send('Will send the users to you!');
    });



userRouter.get('/signup', (req, res, next) => {
    res.statusCode = 200; //not allowed
    res.send('we will send the sign up form');
})
    .post('/signup', (req, res, next) => {
        res.statusCode = 200;
        res.send(`${req.body.firstname}'s account has been created!`);
    });


export default userRouter;