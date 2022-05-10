const express = require('express')
const router = express.Router()

const { typeController } = require('../../controllers')

router.get('/type:id', typeController.getTypes)

module.exports = router
