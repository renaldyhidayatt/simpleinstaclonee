const jwt = require('jsonwebtoken');
const { SecretOrKey } = require('../config/dbSecretKeys');
const mongoose = require('mongoose');
const User = mongoose.model("users")

module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if(!authorization){
        return res.status(401).json({error: "You must be logged in.Try again"})
    }

    const token = authorization.replace("Bearer ","")
    jwt.verify(token, SecretOrKey,(err,payload) => {
        if(err){
            return res.status(401).json({error: "You must be logged in.Try again"})
        }

        const { _id } = payload

        User.findById(_id)
            .then(userdata => {
                req.user = userdata
                next()
            })
    })
}