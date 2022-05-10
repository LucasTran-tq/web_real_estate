const express = require('express')
const { passport } = require('../../plugins/passport')
const { checkRole } = require('../../../middlewares/check-role')
const { userController } = require('../../controllers')
const { userValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')

const router = express.Router()

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkRole('ADMIN'),
    validate(userValidation.getUsersByAdmin),
    userController.getUsers
)
router.get('/:userID/users', validate(userValidation.getUserByID), userController.getUsersbyID)

router.get('/profile/:userID', userController.getUserByID)

router.get('/profile/checkCardNumber/:userID/:cardNumber', userController.checkCardNumber)


router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    checkRole('ADMIN'),
    validate(userValidation.createUserSchema),
    userController.createUser
)

router.patch(
    '/authorization',
    passport.authenticate('jwt', { session: false }),
    checkRole('ADMIN'),
    validate(userValidation.authorization),
    userController.authorization
)

router.patch('/changePassword/:userID', validate(userValidation.changePassword), userController.changePassword)

router.put(
    '/:userID',
    passport.authenticate('jwt', { session: false }),
    validate(userValidation.validateUserID),
    validate(userValidation.updateUserSchema),
    userController.updateUser
) //Not complete yet, incomplete validation, service update User

router.delete(
    '/:userID',
    passport.authenticate('jwt', { session: false }),
    checkRole('ADMIN'),
    validate(userValidation.deleteUserSchema),
    userController.deleteUser
)
router.post(
    '/liked',
    passport.authenticate('jwt', { session: false }),
    validate(userValidation.likeRealEstate),
    userController.likeRealEstate
) //Group 4
router.get('/real-estate', passport.authenticate('jwt', { session: false }), userController.getRealEstatesByUser) // Group 4
router.get('/type-users', userController.getTypeUsers)
router.delete(
    '/real-estate/:realEstateID',
    passport.authenticate('jwt', { session: false }),
    validate(userValidation.deleteRealEstatesByUser),
    userController.deleteRealEstatesByUser
) // Group

// router.get('/:userID/real-estates', userController.getRealEstates)


router.get('/:userEmail/liked_detail', userController.getLikeDetail);



module.exports = router

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User description
 */

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Register as user
 *     tags: [Users]
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
 *               displayName:
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
 *               displayName: fake name
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
