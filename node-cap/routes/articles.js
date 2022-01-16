import express from "express";
import jwt from 'jsonwebtoken';
import config from "../config.js";

const articlesRouter = express.Router();
articlesRouter.use(express.json());



const articles = [
    {
        user: 'paul@gmail.com',
        title: 'post 1'
    },
    {
        user: 'jean@gmail.com',
        title: 'post 2'
    },
]

articlesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.json(articles.filter(article => article.user === req.user.email))
    })
    .post((req, res, next) => { //authenticate first
        //if the user passes the authentication
        /* const username = req.body.username;
        const user = { name: username }


        const accessToken = jwt.sign(user, config.ACCESS_TOKEN_SECRET);

        res.json({ accessToken: accessToken }); */
    })

    .delete((req, res, next) => {
        res.statusCode = 401;
        res.end('You can not perform the Delete operation');
    });

export default articlesRouter;

