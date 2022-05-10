const catchAsync = require('../../utils/catch-async')
const { userService, realEstateService } = require('../services')
const httpStatus = require('http-status')

const getUsers = catchAsync(async (req, res, next) => {
    const result = await userService.getUsers(req.query)
    res.status(httpStatus.OK).send(result)
})

const getUsersbyID = catchAsync(async (req, res, next) => {
    const users = await userService.getUserByID(req.params.userID)
    res.status(httpStatus.OK).send(users)
})

const getUserByID = catchAsync(async (req, res, next) => {
    const users = await userService.getUserByID2(req.params.userID)
    res.status(httpStatus.OK).send(users)
})

const createUser = catchAsync(async (req, res, next) => {
    const user = await userService.createUser(req.body)
    res.status(httpStatus.CREATED).send({ user })
})

const updateUser = catchAsync(async (req, res, next) => {
    const newUser = await userService.updateUser(req.params.userID, req.body)
    res.status(httpStatus.OK).send({ newUser })
})

const changePassword = catchAsync(async (req, res, next) => {
    const result = await userService.changePassword(req.params.userID, req.body.oldPassword, req.body.newPassword)
    res.status(httpStatus.OK).send(result)
})

const deleteUser = catchAsync(async (req, res, next) => {
    const deletedUser = await userService.deleteUser(req.params.userID)
    res.status(httpStatus.OK).send({ deletedUser })
})

const checkCardNumber = catchAsync(async (req, res, next) => {
    const {userID, cardNumber} = req.params
    const userWithCardNumbers = await userService.checkCardNumber(cardNumber)
  
    let isMatched

    if(userWithCardNumbers.length >= 2){
        isMatched = true
    }
    else{
        let {
            _id
        } = userWithCardNumbers[0]._id

        // the user update another field except the user's cardNumber
        if(userID == _id){
            isMatched = false
        }
        // the user update cardNumber and cardNumber can be matched another
        else{
            isMatched = true
        }
    }

    res.status(httpStatus.OK).send({ isMatched: isMatched })
})

const likeRealEstate = catchAsync(async (req, res, next) => {
    const value = await userService.likeRealEstate(req.user._id, req.body.realEstate)
    res.status(httpStatus.OK).send({
        list: value.likeds,
        id: req.body.realEstate,
    })
})

const getRealEstatesByUser = catchAsync(async (req, res, next) => {
    const result = await realEstateService.getRealEstatesByUser(req.query, req.user)
    res.send(result)
})

const getTypeUsers = catchAsync(async (req, res, next) => {
    const type = ['USER', 'ADMIN']
    res.status(httpStatus.OK).send({ type })
})

const authorization = catchAsync(async (req, res, next) => {
    const user = await userService.authorization(req.body.userID, req.body.role)
    return res.status(httpStatus.OK).send({ user })
})

const deleteRealEstatesByUser = catchAsync(async (req, res, next) => {
    const realEstate = await realEstateService.deleteRealEstate(req.params.realEstateID)
    return res.status(httpStatus.OK).send(realEstate)
})

const getLikeDetail = catchAsync(async (req, res, next) => {

    const user = req.user ? req.user : false
    const { sort, page } = req.query

    const result = await userService.getRealEstate(req.params.userEmail, page, sort, user);
    const getUser = await userService.getUserByEmail(req.params.userEmail);
    return res.status(httpStatus.OK).send(
        {
            getUser,
            result
        })
})
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    getUsersbyID,
    getUserByID,
    checkCardNumber,
    likeRealEstate,
    getRealEstatesByUser,
    getTypeUsers,
    authorization,
    deleteRealEstatesByUser,
    getLikeDetail
}
