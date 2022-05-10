const jwt = require('jsonwebtoken')
const moment = require('moment')

const env = require('../../configs/env')

/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */

const generateToken = (user) => {
    const payload = {
        id: user.id,
        name: user.fullName,
        email: user.email,
        role: user.role,
        isVerifyEmail: user.isVerifyEmail
    }
    return jwt.sign(payload, env.passport.jwtToken, {
        expiresIn: env.passport.jwtAccessExpired,
    })
}

const generateVerifyEmailToken = (email) => {
    const verifyEmailToken = jwt.sign(
        {
            email,
        },
        process.env.PASSPORT_JWT_ACCOUNT_ACTIVATION,
        {
            expiresIn: '5m',
        }
    )
    return verifyEmailToken
}

const generateResetPasswordToken = (email) => {
    const resetPasswordToken = jwt.sign(
        {
            email,
        },
        process.env.PASSPORT_JWT_RESET_PASSWORD,
        {
            expiresIn: '5m',
        }
    )
    return resetPasswordToken
}


module.exports = {
    generateToken,
    generateVerifyEmailToken,
    generateResetPasswordToken,
}
