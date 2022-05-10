const Joi = require('joi')

const { objectId } = require('./customize.validation')

const getNewsByID = {
    params: Joi.object().keys({
        newsID: Joi.string().required().custom(objectId),
    }),
}

const createNewsSchema = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        content:Joi.string().required(),
        image:Joi.string(),
        timepost:Joi.date(),
        image_description:Joi.string(),
    }),
}

module.exports = {
    getNewsByID,
    createNewsSchema,
}
