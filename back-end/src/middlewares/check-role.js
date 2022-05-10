const CustomError = require('../utils/custom-error')
const httpStatus = require('http-status')

const checkRole = (roles) => async (req, res, next) => {
    const role = req.user.role
    if (!role || roles.indexOf(role) === -1) {
        const error = new CustomError(
            httpStatus.UNAUTHORIZED,
            `Unauthorized - Insufficient user rights. Current role: ${role}. Required role: ${roles.toString()}`
        )
        return next(error)
    }
    return next()
}

module.exports = { checkRole }
