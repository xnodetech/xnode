const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");


 router.post('/signup', AuthController.registerNewUser)


router.post('/login', AuthController.loginUser)


router.post('/passwordReset', AuthController.resetPassword)


router.post('/passwordReset/:userId/:token', AuthController.changePassword)


module.exports = router