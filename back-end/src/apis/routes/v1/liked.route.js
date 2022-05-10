const express = require('express')
const validate = require('../../../middlewares/validate')
const { likedController } = require('../../controllers')
const { likedValidation } = require('../../validations')

const router = express.Router()

router.get(
    '/:userID/liked',
    validate(likedValidation.getLikedbyUser),
    likedController.getLikedByUser
)
router.get(
    '/all',
    likedController.getLiked
)

module.exports = router
