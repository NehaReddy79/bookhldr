const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async(req,res) =>{

    try{
        const {username, email, password} = req.body;

        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({username, email, password : hashedPassword});
        await user.save();

        res.status(201).json({message : 'User created'});
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
});


router.post('/login', async(req,res) =>{
    try{
        const{email, password} = req.body;

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message : 'User not found'});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message : 'Invalid credentials'});


        const token  =jwt.sign({id : user._id}, process.env.JWT_SECRET, {expiresIn : '1d'});
        res.json({token, username : user.username});
    }
    catch(err){
        res.status(500).json({message : err.message});
    }
});

module.exports = router;