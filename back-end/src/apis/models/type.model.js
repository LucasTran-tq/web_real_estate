const mongoose = require('mongoose')
const { CategorySchema } = require('./category.model')
const Schema = mongoose.Schema

const TypeSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        category: {
            type: CategorySchema,
            require: true,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

const Type = mongoose.model('types', TypeSchema)

module.exports = {
    TypeSchema,
    Type,
}
