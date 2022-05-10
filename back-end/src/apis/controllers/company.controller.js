const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { companyService } = require('../services')

const getInfo = catchAsync(async (req, res, next) => {
    const info = await companyService.getInfo()
    return res.status(httpStatus.OK).send(info)
})

const updateInfo = catchAsync(async (req, res, next) => {
    const newInfo = await companyService.updateInfo(req.body)
    res.status(httpStatus.OK).send({ newInfo })
})

module.exports = {
    getInfo,
    updateInfo,
}