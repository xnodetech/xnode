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
 *    name: Authentication
 *    description: Login AND Signup
 */
 router.post('/signup', AuthController.registerNewUser)
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Authentication]
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


router.post('/login', AuthController.loginUser)
/**
* @swagger
* /auth/login:
*   post:
*     tags: [Authentication]
*     name: Login
*     summary: Login a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             username:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - username
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Incorrect Username or Password
*       500:
*         description: Authentication Error
*/

router.post('/passwordReset', AuthController.resetPassword)
router.post('/passwordReset/:userId/:token', AuthController.changePassword)
module.exports = router