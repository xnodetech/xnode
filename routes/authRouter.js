const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - username
 *         - email
 *         - password
 *       properties:
 *         
 *         firstName:
 *           type: string
 *           description: xnode user's firstname
 *         lastName:
 *           type: string
 *           description: xnode user's lastname
 *         email:
 *           type: string
 *           description: xnode user's email address
 *         password:
 *           type: string
 *           description: xnode user's password
 * 
 *       example:
 *         firstName: john
 *         lastName:  doe
 *         email: johndoe@gmail.com
 *         username: johndoe
 *         password: 12ergiy67
 *
 */

/**
 * @swagger
 *  tags:
 *    name: 
 *    description: Login AND Signup
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: SIGNUP
 *     tags: [USER]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User was not created
 *       500:
 *         description: Server error
 */



router.post('/signup', AuthController.registerNewUser)
router.post('/login', AuthController.loginUser)
router.post('/passwordReset', AuthController.resetPassword)
router.post('/passwordReset/:userId/:token', AuthController.changePassword)
module.exports = router