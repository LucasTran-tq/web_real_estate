const httpStatus = require('http-status')
const catchAsync = require('../../utils/catch-async')
const { newsService } = require('../services')

const getNews = catchAsync(async (req, res, next) => {
    const news = await newsService.getNews()
    return res.status(httpStatus.OK).send(news)
})


const getNewsTitle = catchAsync(async (req, res, next) => {
    const news = await newsService.getNewsTitle()
    return res.status(httpStatus.OK).send(news)
})

const getNewsByID = catchAsync(async (req, res, next) => {
    const newsID = await newsService.getNewsByID(req.params.newsID)

    // const newsID = await newsService.getNewsByID()
    return res.status(httpStatus.OK).send(newsID)
})

const createNews = catchAsync(async (req, res) => {
    const news = await newsService.createNews(req.body)
    res.status(httpStatus.CREATED).send({ news });
})

const deleteNews = catchAsync(async (req, res) => {
    const deleteNews = await newsService.deleteNews(req.params.newsID)
    console.log('delete');
    res.status(httpStatus.OK).send({ deleteNews })
})

const updateNews = catchAsync(async (req, res) => {
    const newNews = await newsService.updateNews(req.params.newsID, req.body)
    res.status(httpStatus.OK).send({ newNews })
})

const getNewsList = catchAsync(async (req, res, next) => {
    const { page } = req.query
    const news = await newsService.getNewsPage(page)
    const newsCount = await newsService.countNews()
    res.status(httpStatus.OK).send({
        newsCount,
        news,
    })
})

module.exports = {
    getNews,
    getNewsByID,
    getNewsTitle,
    getNewsList,
    createNews,
    deleteNews,
    updateNews,
}
