const mongoose = require('mongoose')

const Schema = mongoose.Schema

const LikedSchema = new Schema(
    {
        realEstate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'realestates',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Liked = mongoose.model('liked', LikedSchema)

module.exports = {
    Liked,
    LikedSchema,
}
