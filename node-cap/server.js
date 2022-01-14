import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from './config.js';

//connecting to mongo
const url = config.mongoUrl;
const connection = mongoose.connect(url);
connection.then((db) => {
    console.log('Connected correctly to server!');
}, (err) => { console.log(err) });

//routes
import indexRouter from './routes/index.js';
import userRouter from "./routes/user.js";
import articlesRouter from "./routes/articles.js";

const app = express();

app.use(bodyParser.json());


//Simple logger
app.use('/', function (req, res, next) {
    console.log(req.method + ' ' + req.path + ' - ' + req.ip);
    next();
});

app.use('/', indexRouter);
app.use('/articles', articlesRouter);
app.use('/user', userRouter);


//setup the port
var PORT = 5000;

app.listen(PORT, () =>
    console.log(`Node is listening on http://localhost:${PORT} ...`)
);