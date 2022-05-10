const Joi = require('joi')

const { password, cardNumber, objectId } = require('./customize.validation')

const getRealEstateInfoByID = {
    params: Joi.object().keys({
        realEstateID: Joi.string().required().custom(objectId),
    }),
}
const getRealEstateByProvineId = {
    params: Joi.object().keys({
        provinceID: Joi.string().required().custom(objectId),
    }),
}

const getNewestRealEstateBydateUploaded = {
    params: Joi.object().keys({
        date: Joi.date().required(),
    }),
}

const createRealEstateSchema = {
    body: Joi.object().keys({
        title: Joi.string().required().min(30).max(99),
        type: Joi.object()
            .required()
            .keys({
                _id: Joi.string().required().custom(objectId),
                name: Joi.string().required(),
                category: Joi.object().keys({
                    name: Joi.string(),
                    code: Joi.string(),
                    _id: Joi.string().required().custom(objectId),
                }),
            }),
        project: Joi.string(),
        detail: Joi.object()
            .required()
            .keys({
                content: Joi.string().required(),
                address: Joi.object().keys({
                    province_Id: Joi.string().custom(objectId),
                    district_Id: Joi.string().custom(objectId),
                    ward_Id: Joi.string().custom(objectId),
                    note: Joi.string(),
                }),
                square: Joi.number(),
                numBedroom: Joi.number(),
                numBathroom: Joi.number(),
                numFloor: Joi.number(),
                unitPrice: Joi.number(),
                totalPrice: Joi.number(),
                legalInfo: Joi.string(),
                frontispiece: Joi.number(),
                directOfHouse: Joi.string(),
                directOfBalcony: Joi.string(),
                lengthOfAlley: Joi.number(),
                furnitureInfo: Joi.string(),
            }),
        author: Joi.object().keys({
            _id: Joi.string(),
            email: Joi.string().required(),
            password: Joi.string().required(),
            fullName: Joi.string(),
            image: Joi.string(),
            birthday: Joi.date(),
            sex: Joi.string(),
            cardNumber: Joi.any(),
            accountNumber: Joi.string().min(9).max(12),
            address: Joi.object().keys({
                province_Id: Joi.string().custom(objectId),
                district_Id: Joi.string().custom(objectId),
                ward_Id: Joi.string().custom(objectId),
                note: Joi.string(),
            }),
            type: Joi.string(),
            role: Joi.string(),
            isVerifyEmail: Joi.boolean(),
        }),
        contact: Joi.object().keys({
            name: Joi.string(),
            address: Joi.string(),
            phone: Joi.string().required(),
            email: Joi.string(),
        }),
        dateUpload: Joi.date(),
        dateEnd: Joi.date(),
        pictures: Joi.array().items(Joi.string()),
    }),
}

const getRealEstateSale = {
    params: Joi.object().keys({
        page: Joi.string(),
        sort: Joi.string(),
    }),
}

const getRealEstateRent = {
    params: Joi.object().keys({
        page: Joi.string(),
        sort: Joi.string(),
    }),
}

const getRealEstatesByTypeID = {
    params: Joi.object().keys({
        typeID: Joi.string().required(),
    }),
    query: Joi.object().keys({
        page: Joi.string().required(),
        sort: Joi.string().required(),
    }),
}

module.exports = {
    getRealEstateInfoByID,
    createRealEstateSchema,
    getRealEstateByProvineId,
    getNewestRealEstateBydateUploaded,
    getRealEstateSale,
    getRealEstateRent,
    getRealEstatesByTypeID,
}
