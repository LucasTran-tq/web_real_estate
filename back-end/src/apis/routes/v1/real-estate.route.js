const express = require('express')
const validate = require('../../../middlewares/validate')
const checkUserLogged = require('../../../middlewares/check-user-logged')
const { passport } = require('../../plugins/passport')

const { realEstateValidation } = require('../../validations')
const { realEstateController } = require('../../controllers')

const router = express.Router()

router.get(
    '/sale',
    checkUserLogged,
    validate(realEstateValidation.getRealEstateSale),
    realEstateController.getRealEstatesSale
)
router.get(
    '/rent',
    checkUserLogged,
    validate(realEstateValidation.getRealEstateRent),
    realEstateController.getRealEstatesRent
)
router.get('/sale-province', checkUserLogged, realEstateController.getRealEstatesSaleByProvince)
router.get('/search',checkUserLogged, realEstateController.getRealEstateBySearch)
router.get(
    '/type/:typeID',
    checkUserLogged,
    validate(realEstateValidation.getRealEstatesByTypeID),
    realEstateController.getRealEstatesByTypeID
) //Group 4
router.get('/:realEstateID', validate(realEstateValidation.getRealEstateInfoByID), realEstateController.getRealEstateInfo)
router.get(
    '/area/:provinceID',
    checkUserLogged,
    validate(realEstateValidation.getRealEstateByProvineId),
    realEstateController.getRealEstateByProvineId
)
router.get(
    '/area/:provinceID',
    validate(realEstateValidation.getRealEstateByProvineId),
    realEstateController.getRealEstateByProvineId
)
// router.get('/', realEstateController.getRealEstates) /// nó chạy cái route này trước
// router.post('/post',
//     realEstateController.saveImages,
//     realEstateController.testAPI
// )
router.get(
    '/all/newest/:date',
    checkUserLogged,
    validate(realEstateValidation.getNewestRealEstateBydateUploaded),
    realEstateController.getNewestRealEstateBydateUploaded
)
router.get(
    '/all/newest/:date',
    validate(realEstateValidation.getNewestRealEstateBydateUploaded),
    realEstateController.getNewestRealEstateBydateUploaded
)

router.get('/newestate/dateupload/', checkUserLogged, realEstateController.getNewestRealEstate)

router.post('/', validate(realEstateValidation.createRealEstateSchema), realEstateController.createRealEstate)

module.exports = router
