const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { addressService, realEstateService } = require('../services')
const env = require('../../configs/env')

const getProvinces = catchAsync(async (req, res, next) => {
    const provinces = await addressService.getProvinces()
    return res.status(httpStatus.OK).send(provinces)
})

const getDistrictsByProvince = catchAsync(async (req, res, next) => {
    const districts = await addressService.getDistrictsByProvince(req.params.provinceID)
    return res.status(httpStatus.OK).send(districts)
})

const getWardsByDistrict = catchAsync(async (req, res, next) => {
    const wards = await addressService.getWardsByDistrict(req.params.districtID)
    return res.status(httpStatus.OK).send(wards)
})

const getProvinceById = catchAsync(async (req, res, next) => {
    const province = await addressService.getProvinceInfo(req.params.provinceID)
    return res.status(httpStatus.OK).send(province)
})

const getDistrictById = catchAsync(async (req, res, next) => {
    const district = await addressService.getDistrictInfo(req.params.districtID)
    return res.status(httpStatus.OK).send(district)
})

const getWardById = catchAsync(async (req, res, next) => {
    const ward = await addressService.getWardInfo(req.params.wardID)
    return res.status(httpStatus.OK).send(ward)
})


const getTopProvinces = catchAsync(async (req, res, next) => {
    const provinces = await addressService.getTopProvinces()
    return res.status(httpStatus.OK).send(provinces)
})

module.exports = {
    getProvinces,
    getDistrictsByProvince,
    getWardsByDistrict,
    getProvinceById,
    getDistrictById,
    getWardById,
    getTopProvinces
}
