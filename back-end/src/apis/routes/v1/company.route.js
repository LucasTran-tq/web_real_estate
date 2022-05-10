const express = require('express')
const router = express.Router()
const { companyController } = require('../../controllers')

router.get('/info/', companyController.getInfo)
router.put('/', companyController.updateInfo)

module.exports = router
