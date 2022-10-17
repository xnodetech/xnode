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
/**
* @swagger
* /passwordReset:
*   post:
*     tags: [Authentication]
*     name: Forgot Password
*     summary: Reset a user's password
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*           type: object
*           properties:
*             email:
*               type: string
*          required:
*           - email
*     responses:
*       200:
*         description: password reset link sent to your email account
*       401:
*         description: user with given email doesn't exist
*       500:
*         description: server error
*/

router.post('/passwordReset/:userId/:token', AuthController.changePassword)

/**
 * @swagger
 * '/passwordReset/{userId}/{token}':
 *  post:
 *     tags:
 *     - Authentication
 *     summary: change user's password
 *     parameters:
 *      - name: userId
 *        in: path
 *        description: user id
 *        required: true
 *      - name: token
 *        in: path
 *        description: token of a user
 *        required: true
 *     responses:
 *      200:
 *        description: Removed
 *      400:
 *        description: Bad request
 *      404:
 *        description: Not Found
 */


module.exports = router