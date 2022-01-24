export const getLogout = (req, res, next) => {
    if (req.cookie) {
        req.session.destroy();
        res.clearCookie('session_id');
        res.redirect('/');
    }
    else {
        var err = new Error('You are not logged in!');
        err.status = 403;
        next(err);
    }
}

export const getUser = (req, res, next) => {

}
/* export const findUser = (req, res, next) => {
    const user = await Users.find({ 'email': `${req.body.email}` });
    Users.findOne({ 'email': `${req.body.email}` }, 'email password', function (err, user) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        console.log('%s is a %s.', user.email,
            user.password);
    });
    next()
} */
