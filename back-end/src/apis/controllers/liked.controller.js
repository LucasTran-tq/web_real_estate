const httpStatus = require('http-status')

const catchAsync = require('../../utils/catch-async')
const { likedService } = require('../services')



const getLikedByUser = catchAsync(async (req, res, next) => {
    const noti = await likedService.getLikedByUser(req.params.userID)
    return res.status(httpStatus.OK).send(noti)
})

const getLiked = catchAsync(async (req, res, next) => {
    const noti = await likedService.getLiked()
    return res.status(httpStatus.OK).send(noti)
})

module.exports = {
    getLikedByUser,
    getLiked
}
