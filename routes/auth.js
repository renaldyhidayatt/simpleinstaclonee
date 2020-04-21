const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// model user
const User = mongoose.model("users");

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SecretOrKey } = require('../config/dbSecretKeys')


router.post('/register',(req, res) => {
    const { name, email ,password, pic} = req.body;
    if(!email || !password || !name){
        return res.status(422).json({error:"please add field"})
    }
    User.findOne({email:email})
        .then((savedUser) => {
            if(savedUser){
                return res.status(422).json({error:"user already exists with that email"})
            }
            bcrypt.hash(password,12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        password:hashedpassword,
                        name,
                        pic
                    })
                    user.save()
                        .then(user => {
                            res.json({message:"saved successfully"})
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            console.log(err)
        })
})


router.post('/login',(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        return res.status(422).json({error: "please adding email or password"})
    }
    User.findOne({email:email})
        .then(savedUser => {
            if(!savedUser){
                return res.status(422).json({error:"invalid Email or password. Try Again"})
            }
            bcrypt.compare(password,savedUser.password)
                .then(doMatch => {
                    if(doMatch){
                        const token = jwt.sign({_id:savedUser._id},SecretOrKey)
                        const {_id,name,email} = savedUser
                        res.json({token, user:{_id,name,email}})
                    }else{
                        return  res.status(422).json({error:"Invalid Email Or Password.Try Again!!"})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});

module.exports = router;