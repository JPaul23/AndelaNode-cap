import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import config from './config.js';
import { verifyToken } from './controllers/authentication.js';


//connecting to mongo
//const url = config.mongoUrl;
/* const connection = mongoose.connect(url);
connection.then((db) => {
    console.log('Connected correctly to MongoDB server! ');
}, (err) => {
    console.log('***** Not connected to MongoDB ***** server!');
    console.log(err.message);
}); */

//routes
import indexRouter from './routes/index.js';
import userRouter from "./routes/user.js";
import articlesRouter from "./routes/articles.js";

const app = express();

app.use(express.json());
//app.use(bodyParser.json());



//Simple logger
app.use('/', function (req, res, next) {
    console.log(`==> Method: ${req.method} --Path: ${req.path} --IP: ${req.ip} --Code: ${res.statusCode}`);
    next();
});

app.use('/', indexRouter);
app.use('/articles', verifyToken, articlesRouter);
app.use('/user', userRouter);


//setup the port
var PORT = 5000;

app.listen(PORT, () =>
    console.log(`Node is listening on http://localhost:${PORT} ...`)
);