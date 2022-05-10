const mongoose = require('mongoose')

const Schema = mongoose.Schema

const NewsSchema = new Schema(
    {
        title: {
            type: String,
            require: true,
        },
        content: {
            type: String,
            require: true,
        },
        image:{
            type:String,
            default:"",
        },
        timepost:{
            type:Date,
            default:Date.now()
        },
        image_description:{
            type:String,
            default:"Không có mô tả...",
        }
        
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const News = mongoose.model('news', NewsSchema)

module.exports = {
    News,
    NewsSchema,
}
