const express = require('express')
const router = express.Router()

//Client
const authRoute = require('./v1/auth.route')
const userRoute = require('./v1/user.route')
const addressRoute = require('./v1/address.route')
const typeRoute = require('./v1/type.route')
const realEstateRoute = require('./v1/real-estate.route')
const likedRoute = require('./v1/liked.route')
const cateRoute = require('./v1/category.route')
const newsRoute = require('./v1/news.route')

const companyRoute = require('./v1/company.route')




//Admin
const userAdminRoute = require('./v2/user.admin.route')

router.use('/v1/auth', authRoute)
router.use('/v1/users', userRoute)
router.use('/v1/user', userRoute)
router.use('/v1/address', addressRoute)
router.use('/v1/liked', likedRoute)
router.use('/v1/type', typeRoute)
router.use('/v1/real-estate', realEstateRoute)
router.use('/v1/categories', cateRoute)
router.use('/v1/news', newsRoute)
router.use('/v1/company', companyRoute)

router.use('/admin/users', userAdminRoute)

module.exports = router
