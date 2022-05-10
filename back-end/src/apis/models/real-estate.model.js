const mongoose = require('mongoose')
const { TypeSchema } = require('./type.model')
const { DetailSchema } = require('./detail.model')
const { UserSchema } = require('./user.model')
const { ContactSchema } = require('./contact.model')
const Schema = mongoose.Schema

const RealEstateSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        type: {
            type: TypeSchema,
            required: true,
        },
        project: {
            type: String,
            default: 'Bất động sản chưa có tên chính thức',
        },
        detail: {
            type: DetailSchema,
            required: true,
        },
        pictures: {
            type: [String],
        },
        author: {
            //type: mongoose.Schema.Types.ObjectId,
            //ref: 'user',
            type: UserSchema,
        },
        contact: {
            type: ContactSchema,
            required: true,
        },
        dateUpload: {
            type: Date,
            default: Date.now(),
        },
        dateEnd: {
            type: Date,
            default: Date.now() + 30 * 24 * 60 * 60 * 1000,
        },
        pictures: {
            type: [String],
        },
    },
    {
        timestamps: true,
    }
)
// RealEstateSchema.pre('save', async function (next) {
//     this.detail.totalPrice = this.detail.unitPrice * this.detail.square;
//     next()
// })
const RealEstate = mongoose.model('RealEstate', RealEstateSchema)

module.exports = {
    RealEstateSchema,
    RealEstate,
}
