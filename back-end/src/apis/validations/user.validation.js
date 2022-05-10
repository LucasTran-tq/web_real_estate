const Joi = require('joi')

const { password, cardNumber, objectId } = require('./customize.validation')

const createUserSchema = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required().custom(password),
        fullName: Joi.string().required(),
        image: Joi.string(),
        birthday: Joi.date(),
        sex: Joi.string().required(),
        cardNumber: Joi.string().min(9).max(12).custom(cardNumber),
        address: Joi.object().keys({
            province_Id: Joi.string().custom(objectId),
            district_Id: Joi.string().custom(objectId),
            ward_Id: Joi.string().custom(objectId),
        }),
        type: Joi.boolean(),
        role: Joi.string(),
        isVerifyEmail: Joi.boolean(),
    }),
}

const changePassword = {
    params: Joi.object().keys({
        userID: Joi.string().custom(objectId),
    }),
    body: Joi.object().required({
        oldPassword: Joi.string().required().custom(password),
        newPassword: Joi.string().required().custom(password),
    }),
}

const deleteUserSchema = {
    params: Joi.object().keys({
        userID: Joi.string().custom(objectId),
    }),
}
const getUserByID = {
    params: Joi.object().keys({
        userID: Joi.string().required().custom(objectId),
    }),
}

const getUsersByAdmin = {
    query: Joi.object().keys({
        userID: Joi.string(),
        page: Joi.string(),
        sort: Joi.string(),
        role: Joi.string(),
    }),
}

const authorization = {
    body: Joi.object().keys({
        userID: Joi.string().required().custom(objectId),
        role: Joi.string().required(),
    }),
}

const likeRealEstate = {
    body: Joi.object().keys({
        realEstate: Joi.string().required().custom(objectId),
    }),
}

const deleteRealEstatesByUser = {
    params: Joi.object().keys({
        realEstateID: Joi.string().required().custom(objectId),
    }),
}

module.exports = {
    createUserSchema,
    deleteUserSchema,
    changePassword,
    getUserByID,
    getUsersByAdmin,
    authorization,
    likeRealEstate,
    deleteRealEstatesByUser,
}
