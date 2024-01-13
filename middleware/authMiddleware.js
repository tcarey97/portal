const jwt = require('jsonwebtoken');
let users = require('../models/database');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //checks if token exists
    if (token){
        jwt.verify(token,'secret key', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};

const checkCurrentUser = (req, res, next) => {
    const token = req.cookies.jwt;

    //checks if token exists
    if (token){
        jwt.verify(token,'secret key', (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                const id = decodedToken.id;

                let foundUsers = users.filter((user) => {
                    return (user.id === id)});

                if (foundUsers.length > 0){
                    res.locals.user = foundUsers[0];
                    console.log(res.locals, "this is res.locals");
                } else {
                    res.locals.user = null;
                    console.log("jwt user id does not match any user's id in the database");
                }

                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};

module.exports = {requireAuth, checkCurrentUser};


