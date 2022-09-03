const User = require('../models/user')
const bcrypt = require('bcrypt')
require("dotenv").config()
const expiryDate = process.env.EXPIRY_DATE
const { createToken } = require('../helpers/jwtService')

exports.registerNewUser = (req, res) => {
    // fetch users details from req.body
    User.findOne({username: req.body.username}, (err, existingUser) => {
        if (err) {
            return res.status(500).json({err})
        }
        // check if a user with this username exists
        if (existingUser) {
            res.status(400).json({message: 'a user with this username already exists'})
        }
        // create a new user
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email:req.body.email,
            username: req.body.username
        
        }, (err, newUser) => {
            if (err) {
                return res.status(500).json({err})
            }
            // hash user's password
            bcrypt.genSalt(10, (err, salt) => {
                if (err) {
                    return res.status(500).json({ err });
                }
                bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
                    if (err) {
                        return res.status(500).json({ err });
                    }
                    // save password to database
                    newUser.password = hashedPassword
                    newUser.save((err, savedUser) => {
                        if (err) {
                            return res.status(500).json({ err });
                        }
                        // create jwt for user
                        let token = createToken(newUser)
                        if (!token) {
                            return res.status(500).json({message: "sorry, we could not authenticate you, please login"})
                        }
                        // send token to user
                        return res.status(200).json({
                            success:true,
                            message: "New XNODE user added",
                            token
                        })
                    })
                })
            })
        })
    })
}

exports.loginUser = (req, res) => {
    // check if user exists
    User.findOne({username: req.body.username}, (err, foundUser) => {
        if (err) {
            return res.status(500).json({err})
        }
        if (!foundUser) {
            return res.status(401).json({message: "incorrect username"})
        }
        // check if password is correct
        let match = bcrypt.compareSync(req.body.password, foundUser.password)
        if (!match) {
            return res.status(401).json({message: "incorrect password"})
        }
        // create a token
        let token = createToken(foundUser)
        if (!token) {
            return res.status(500).json({message: "sorry, we could not authenticate you, please login"})
        }
        //set token to cookie
           // send token to user
        return res.status(200).json({
            success:true,
            message: "XNODE USER LOGGED IN",
            token
        })
        
    }) 
}

