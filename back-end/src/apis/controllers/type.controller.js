const { Type } = require('../models/type.model')
const { Category } = require('../models')
const catchAsync = require('../../utils/catch-async')
const {typeService} =require('../services')
const httpStatus = require('http-status')
const getTypes = catchAsync(async (req, res, next) => {
    const types = await typeService.getTypes();
    return res.status(httpStatus.OK).send(types);
})


module.exports = {
    getTypes
}
