const express = require('express')
const { passport } = require('../../plugins/passport')
const { checkRole } = require('../../../middlewares/check-role')
const { userController } = require('../../controllers')
const { userValidation } = require('../../validations')
const validate = require('../../../middlewares/validate')

const router = express.Router()

module.exports = router
