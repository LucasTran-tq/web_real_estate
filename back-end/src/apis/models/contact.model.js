const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ContactSchema = new Schema(
    {
        name: {
            type: String,
            default:"Chưa có thông tin"
        },
        address: {
            type: String,
            default:"Chưa có thông tin"
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            default:"Chưa có thông tin"
        },
    },
    {
        timestamps: true,
    }
)

const Contact = mongoose.model('contacts', ContactSchema)

module.exports = {
    ContactSchema,
    Contact,
}
