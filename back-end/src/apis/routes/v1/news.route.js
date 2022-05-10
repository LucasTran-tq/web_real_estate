const express = require('express')
const validate = require('../../../middlewares/validate')
const { newsController } = require('../../controllers')
const { newsValidation } = require('../../validations')
const router = express.Router()

router.delete('/:newsID',newsController.deleteNews);
router.put('/:newsID',newsController.updateNews)

router.get('/allnews/', newsController.getNews)
router.get('/newdetail/:newsID', validate(newsValidation.getNewsByID), newsController.getNewsByID)
router.get('/allnews/news/title', newsController.getNewsTitle)
router.get('/allnews/list', newsController.getNewsList)

router.post('/',validate(newsValidation.createNewsSchema),newsController.createNews)



module.exports = router
