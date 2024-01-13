const { Router } = require('express');
const fs = require("fs");
const router = Router();
const jwt = require('jsonwebtoken');
let {requireAuth} = require('../middleware/authMiddleware');
const {addToDatabase, userExists, authenticatedUser} = require('../models/users');

router.get('/signup', (req, res) => {
    res.render('signup');
});

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({id}, 'secret key', {
        expiresIn: maxAge
    })
}

router.post('/signup', async (req, res) => {
    const {email, password} = req.body;
    if (email && password){
        if (userExists(email)){
            return res.status(409).send({message: "User already exists!"});
        } else {
            await addToDatabase(email, password);
            return res.status(200).send({message: "User successfully registered. Now you can login"});
        }
    } else {
        return res.status(208).send({message: "Invalid Login. Check username and password"});
    }

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    if (email && password) {
        const foundUser = await authenticatedUser(email, password);
        if (foundUser) {
            console.log("yes found user", foundUser);
            const token = createToken(foundUser.id);
            res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000});
            return res.status(200).json({message: "User successfully logged in"});
        } else {
            return res.status(404).json({message: "User email and/or password doesn't match our records!"});
        }
    } else {
        return res.status(208).json({message: "Invalid Login. Please provide both email and password"});

    }

});

router.get('/secret', requireAuth, (req, res) => {
    res.render('secret');
});

router.get('/logout',(req, res) => {
    res.cookie('jwt','', {maxAge: 1});
    res.redirect('/');

});

module.exports = router;