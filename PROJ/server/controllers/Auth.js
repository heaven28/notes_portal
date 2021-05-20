const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const logger = require('../logger');


router.get('/init', async (req, res) => {
    let response = null;

    if(!req.query.token){
        const {userId} = jwt.verify(req.query.token, 'app');
        const user = await User.findById(userId);
    
        if(user) {
            logger.info('User ' + user.name + ' found'); 
            response = user;        
        }
    }    
    res.send({user: response});
});


router.post('/register', async (req, res) => {
    const userExists = await User.findOne({email: req.body.email});
    if(userExists) {
        logger.error('User Already Exists')
        res.status(400).send({
            message: 'email_already_exists'
        });
        return;
    }
    const newUser = User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                createdAt: Date.now()
            });
            newUser.save();
            logger.info('User ' + newUser.name + ' Registered Successfully');
            res.sendStatus(201);
});


router.post('/login', async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        logger.error('User does not exist');
        res.status(401).send({
            message: 'user_not_found'
        });
        return;
    }

    const isEqual = await bcrypt.compare(req.body.password, user.password);
    if(!isEqual){
        logger.error('Incorrect Password');
        res.status(401).send({
            message: 'wrong_password'
        });
        return;
    }

    const token = jwt.sign({userId: user._id}, 'app');
    logger.info('Login token generated for '+ user.name);
    res.send({
        token,
        user
    });
    logger.info('User ' + user.name + ' logged in successfully');

});
module.exports = router;