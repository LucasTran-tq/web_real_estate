const Joi = require('joi')

const { objectId } = require('./customize.validation')

const getLikedbyUser = {
    params: Joi.object().keys({
        userID: Joi.string().required().custom(objectId),
    }),
}
module.exports = {
    getLikedbyUser,
}
