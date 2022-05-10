const { News } = require('../models')

const getNews = async () => {
    return News.find({})
}

const getNewsByID = async (newsID) => {
    return News.find({ _id: newsID })
}

const getNewsTitle = async () => {
    return News.find({}).limit(6)
}

const createNews=async(news)=>{
    return News.create(news);
}

const deleteNews=async(newsID)=>{
    const foundNews = await News.findById(newsID)
    if (!foundNews) throw new CustomError(httpStatus.NOT_FOUND, 'News not found')
    return News.findByIdAndDelete(newsID);
}

const updateNews = async (newsID, newsBody) => {
    const foundNews = await News.findById(newsID)
    if (!foundNews) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'News not found')
    }
    return News.findByIdAndUpdate(newsID, newsBody, {
        new: true,
    })
}

const getNewsPage = async (page) => {
    let NewsPage = await News.find({})
        .limit(12)
        .skip(12 * page)
    return NewsPage
}

const countNews = async () => {
    return News.countDocuments()
}

module.exports = {
    getNews,
    getNewsByID,
    getNewsTitle,
    createNews,
    deleteNews,
    updateNews,
    countNews,
    getNewsPage,
}
