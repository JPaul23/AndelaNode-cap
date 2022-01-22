import express from "express";
import jwt from 'jsonwebtoken';

import config from "../config.js";
import { verifyToken, verifyUser } from "../Middleware/authentication.js";
import articleModel from "../models/articles.js";

const articlesRouter = express.Router();
articlesRouter.use(express.json());

const Articles = articleModel;

articlesRouter.route('/')
    .all((req, res, next) => {
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        /* res.json(articles.filter(article => article.user === req.user.email)) */
        Articles.find({})
            .then((articles) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(articles);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(verifyUser, (req, res, next) => {
        Articles.create(req.body)
            .then((article) => {
                console.log('article Created ', article);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(article)
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put(verifyUser, (req, res, next) => {
        res.statusCode = 403; //not supported
        res.end('PUT operation not supported on /articles');
    })

    .delete(verifyUser, (req, res, next) => {
        Articles.remove({})
            .then((response) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(response)
            }, (err) => next(err))
            .catch((err) => next(err));
    });

export default articlesRouter;

