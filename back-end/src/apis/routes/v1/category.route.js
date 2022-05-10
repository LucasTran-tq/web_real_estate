const express = require('express')
const router = express.Router()

const { cateController } = require('../../controllers')

router.get('/', cateController.getCategories)
router.get('/:cateID/types', cateController.getTypesByCategory)

module.exports = router
