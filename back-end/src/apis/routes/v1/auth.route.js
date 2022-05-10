const express = require('express')
const { passport } = require('../../plugins/passport')
const { authController } = require('../../controllers')
const { authValidation } = require('../../validations')

const validate = require('../../../middlewares/validate')

const router = express.Router()

router.post(
    '/login',
    validate(authValidation.loginSchema),
    passport.authenticate('local', { session: false }),
    authController.login
)
router.post('/register', validate(authValidation.registerSchema), authController.register)
router.post('/sendverificationemail', passport.authenticate('jwt', { session: false }), authController.sendVerificationEmail)
router.post('/activate/', validate(authValidation.activateEmailTokenSchema), authController.activateEmailToken)
router.post('/updateemail', authController.updateEmail)
router.post('/google', authController.authGoogle)
router.post('/facebook', authController.authFacebook)
router.post('/forgot', authController.forgotPassword)
router.post('/reset/', validate(authValidation.resetPasswordTokenSchema), authController.resetPassword)

module.exports = router

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register as user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - displayName
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 6
 *                 description: At least one number and one letter
 *             example:
 *               name: fake name
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/DuplicateEmail'
 */
