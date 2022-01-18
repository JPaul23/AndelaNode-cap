import jwt from "jsonwebtoken";
import config from "../config.js";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] //getting the token
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) res.sendStatus(403) //not valid token
        req.user = user;
        next();

    })

}

export const verifyCookie = (req, res, next) => {
    const cookie = req.cookies.session_id;
    if (!cookie) {
        console.log(cookie);
        return res.sendStatus(403);
    }
    //verifyToken();
    //next();
}
