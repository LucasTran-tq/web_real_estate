const Joi = require('joi')

const { email, password, cardNumber, objectId } = require('./customize.validation')

const loginSchema = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required(),
    }),
}

const registerSchema = {
    body: Joi.object().keys({
        email: Joi.string().required().custom(email),
        password: Joi.string().required().custom(password),
        fullName: Joi.string().required(),
        image: Joi.string(),
        birthday: Joi.date(),
        sex: Joi.string().required(),
        cardNumber: Joi.string().min(9).max(12).custom(cardNumber).required(),
        accountNumber: Joi.string().min(9).max(12).required(),
        address: Joi.object().keys({
            province_Id: Joi.string(),
            district_Id: Joi.string(),
            ward_Id: Joi.string(),
        }),
        type: Joi.string(),
        role: Joi.string(),
        isVerifyEmail: Joi.boolean(),
    }),
}

const activateEmailTokenSchema = {
    body: Joi.object().keys({
        token: Joi.string(),
    }),
}

const resetPasswordTokenSchema = {
    body: Joi.object().keys({
        token: Joi.string(),
        password: Joi.string().required().custom(password),
    }),
}

module.exports = {
    loginSchema,
    registerSchema,
    activateEmailTokenSchema,
    resetPasswordTokenSchema,
}
