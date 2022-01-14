import express from "express";
import bodyParser from "body-parser";

const articlesRouter = express.Router();
articlesRouter.use(bodyParser.json());

articlesRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next()
    })
    .get((req, res, next) => {
        res.send('Will send the articles to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 401; //not allowed
        res.send('You have to be signed in to post article');
    })
    .delete((req, res, next) => {
        res.statusCode = 401;
        res.end('You can not perform the Delete operation');
    });

export default articlesRouter;