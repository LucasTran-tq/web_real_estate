const httpStatus = require('http-status')
const { realEstateService } = require('../services')
const catchAsync = require('../../utils/catch-async')
const env = require('../../configs/env')

const getRealEstatesSale = catchAsync(async (req, res) => {
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const realEstates = await realEstateService.getRealEstatesSale(page, sort, user)
    const lengthDocuments = await realEstateService.countDocuments(env.categories.sale)
    res.status(httpStatus.OK).send({
        lengthDocuments,
        realEstates,
    })
})

const getRealEstatesRent = catchAsync(async (req, res) => {
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const realEstates = await realEstateService.getRealEstatesRent(page, sort, user)
    const lengthDocuments = await realEstateService.countDocuments(env.categories.rent)
    res.status(httpStatus.OK).send({
        lengthDocuments,
        realEstates,
    })
})

const getRealEstatesSaleByProvince = catchAsync(async (req, res) => {
    const user = req.user ? req.user : false
    const { sort, page, province } = req.query
    const realEstates = await realEstateService.getRealEstatesSaleByProvince(page, sort, user, province)
    const lengthDocuments = await realEstateService.countDocumentsByProvince(env.categories.sale, province)
    res.status(httpStatus.OK).send({
        lengthDocuments,
        realEstates,
    })
})

const getRealEstateInfo = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const realEstate = await realEstateService.getRealEstateInfo(req.params.realEstateID, user)
    return res.status(httpStatus.OK).send(realEstate)
})

const getRealEstateByProvineId = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const readdress = req.params.provinceID
    const realEstate = await realEstateService.getRealEstateByProvineId(readdress, user)
    return res.status(httpStatus.OK).send(realEstate)
})

const getRealEstateBySearch = catchAsync(async (req, res, next) => {
    console.log('hello')
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const realestate = await realEstateService.getRealEstateBySearch(req.query,user)
    return res.status(httpStatus.OK).send(realestate)
})

const createRealEstate = catchAsync(async (req, res) => {
    const realeState = await realEstateService.createRealEstate(req.body)
    res.status(httpStatus.CREATED).send({ realeState })
})

const getNewestRealEstateBydateUploaded = catchAsync(async (req, res, next) => {
    const newest = await realEstateService.getNewestRealEstateBydateUploaded(req.params.date)
    return res.status(httpStatus.OK).send(newest)
})

const getNewestRealEstate = catchAsync(async (req, res, next) => {
    const user = req.user ? req.user : false
    const newest = await realEstateService.getNewestRealEstate(user)
    return res.status(httpStatus.OK).send(newest)
})
const getRealEstatesByTypeID = catchAsync(async (req, res) => {
    const user = req.user ? req.user : false
    const { sort, page } = req.query
    const { typeID } = req.params
    const realEstates = await realEstateService.getRealEstatesByTypeID(page, sort, user, typeID)
    const lengthDocuments = await realEstateService.countDocumentsByTypeID(typeID)
    res.status(httpStatus.OK).send({
        lengthDocuments,
        realEstates,
    })
})

module.exports = {
    getRealEstateInfo,
    createRealEstate,
    getRealEstatesSale,
    getRealEstatesRent,
    getRealEstateByProvineId,
    getNewestRealEstateBydateUploaded,
    getNewestRealEstate,
    getRealEstateBySearch,
    getRealEstatesSaleByProvince,
    getRealEstatesByTypeID,
}
