const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategorySchema = new Schema(
    {
        name: {
            type: String,
        },
        code: {
            type: String,
        },
    },
    {
        timestamps: false,
        versionKey: false,
    }
)

const Category = mongoose.model('category', CategorySchema)

module.exports = {
    CategorySchema,
    Category,
}
