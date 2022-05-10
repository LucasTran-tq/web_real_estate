const { passport } = require('../apis/plugins/passport')

const checkUserLogged = (req, res, next) => {
    passport.authenticate('jwt', (err, user, info) => {
        req.user = user
        next()
    })(req, res, next)
}

module.exports = checkUserLogged
