const mongoose = require('mongoose')
const { AddressSchema } = require('./address.model')

const Schema = mongoose.Schema

const DetailSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
        },
        address: {
            type: AddressSchema,
            required: true,
        },
        square: {
            type: Number,
            default:1
        },
        numBedroom: {
            type: Number,
            default:1,
        },
        numBathroom: {
            type: Number,
            default:1,
        },
        numFloor: {
            type: Number,
            default:1,
        },
        unitPrice: {
            type: Number,
            default:1,
        },
        totalPrice: {
            type: Number,
            default:1000000,
        },
        legalInfo: {
            type: String,
            default:"",
        },
        frontispiece: {
            type: Number,
            default:1
        },
        directOfHouse: {
            type: String,
            default:"Đông"
        },
        directOfBalcony: {
            type: String,
            default:"Đông"
        },
        lengthOfAlley: {
            type: Number,
            default:1
        },
        furnitureInfo: {
            type: String,
            default:"Chưa có thông tin về nội thất"
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)



const Detail = mongoose.model('details', DetailSchema)

module.exports = {
    DetailSchema,
    Detail,
}
