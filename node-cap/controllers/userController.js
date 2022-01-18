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
