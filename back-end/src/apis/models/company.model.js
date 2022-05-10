const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CompanySchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
        slogan: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

const Company = mongoose.model('company', CompanySchema)

module.exports = {
    CompanySchema,
    Company,
}
