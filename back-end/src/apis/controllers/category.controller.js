const catchAsync = require('../../utils/catch-async')
const {cateService,typeService} =require('../services')
const httpStatus = require('http-status')
const getCategories = catchAsync(async (req, res, next) => {
    const cates = await cateService.getCategories();
    return res.status(httpStatus.OK).send(cates);
})
const getTypesByCategory=catchAsync(async (req, res, next) => {
    const types = await typeService.getTypesByCategory(req.params.cateID);
    return res.status(httpStatus.OK).send(types);
})

module.exports = {
    getCategories,
    getTypesByCategory
}
