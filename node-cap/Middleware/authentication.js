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

export const authorization = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, config.ACCESS_TOKEN_SECRET);
        return next();
    } catch {
        return res.sendStatus(403);
    }
};
