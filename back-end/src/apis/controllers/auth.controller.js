const httpStatus = require('http-status')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const env = require('../../configs/env')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const CustomError = require('../../utils/custom-error')

const catchAsync = require('../../utils/catch-async')
const { tokenService, userService, authService } = require('../services')
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))

const login = catchAsync(async (req, res) => {
    const { user } = req
    const token = await tokenService.generateToken(user)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.OK).send({ user })
})

const register = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body)
    const token = await tokenService.generateToken(user)

    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.CREATED).send({
        user: user,
        message: 'Send email verification',
    })
})

const sendVerificationEmail = catchAsync(async (req, res) => {
    const { email } = req.user
    const verifyEmailToken = await tokenService.generateVerifyEmailToken(email)
    await authService.sendVerificationEmail(verifyEmailToken, email)
    res.status(httpStatus.OK).send({
        message: 'Send email verification',
    })
})

const activateEmailToken = catchAsync(async (req, res) => {
    const { token } = req.body
    await authService.activateEmailToken(token)
    res.status(httpStatus.OK).send({
        message: 'Your token has been activated',
    })
})

const updateEmail = catchAsync(async (req, res) => {
    const { email, new_email } = req.body
    const user = await userService.updateEmail(email, new_email)

    const token = await tokenService.generateToken(user)
    res.setHeader('Authorization', `Bearer ${token}`)
    res.status(httpStatus.OK).send({ user })

})

const forgotPassword = catchAsync(async (req, res) => {
    const { email } = req.body
    const user = await userService.getUserByEmail(email)
    if(user == null) throw new CustomError('400', 'User not found')

    const resetPasswordToken = await tokenService.generateResetPasswordToken(email)
    await authService.sendResetPasswordEmail(resetPasswordToken, email)
    res.status(httpStatus.OK).send({
        message: 'Send email to reset password',
        token: resetPasswordToken
    })
})

const resetPassword = catchAsync(async (req, res) => {
    const { token, password } = req.body
    await authService.resetPassword(token, password)
    res.status(httpStatus.OK).send({
        message: 'Change your password successfully',
    })
})

const authGoogle = catchAsync(async (req, res) => {
     try {
        const { idToken } = req.body
        client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then((response) => {
            const { email, name, picture } = response.payload

            User.findOne({ email }).exec((err, user) => {
                if (user) {
                    const user_payload = {
                        id: user.id,
                        name: user.fullName,
                        email: user.email,
                        role: user.role,
                        isVerifyEmail: true
                    }
                    const token = jwt.sign(user_payload, env.passport.jwtToken, {
                        expiresIn: env.passport.jwtAccessExpired,
                    })

                    if(user.isVerifyEmail == false) {
                        user.isVerifyEmail = true
                        user.save()
                    }
                    
                    res.setHeader('Authorization', `Bearer ${token}`)
                    return res.status(httpStatus.OK).send({ user })
                } else {
                    const min = 100000000000
                    const max = 999999999999
                    const accountNumber = Math.random() * (max - min) + min

                    const address = {}

                    User.findOne({ accountNumber }).exec((err, user) => {
                        if (user) {
                            throw new CustomError('403', 'Account number already taken')
                        } else {
                            user = new User({
                                fullName: name,
                                email: email,
                                password: email + '123456',
                                address: address,
                                image: picture,
                                birthday: '2001-01-01',
                                sex: null,
                                accountNumber: String(Math.floor(accountNumber)),
                                type: 'CN',
                                role: 'USER',
                                phone: null,
                                isVerifyEmail: true,
                            })
                            user.save((err, data) => {
                                if (err) {
                                    throw new CustomError('500', 'Internet Server Error')
                                }
                                const user_payload = {
                                    id: data.id,
                                    name: data.fullName,
                                    email: data.email,
                                    role: data.role,
                                    isVerifyEmail: true
                                }
                                const token = jwt.sign(user_payload, env.passport.jwtToken, {
                                    expiresIn: env.passport.jwtAccessExpired,
                                })
                                res.setHeader('Authorization', `Bearer ${token}`)
                                return res.status(httpStatus.OK).send({ user })
                            })
                        }
                    })
                }
            })
        })
    } catch (err) {
        throw new CustomError('500', 'Internet Server Error')
    }
})

const authFacebook = catchAsync(async (req, res) => {
    try {
        const { accessToken, userID } = req.body

        const URL = `https://graph.facebook.com/v4.0/${userID}/?fields=id,name,email,picture&access_token=${accessToken}`

        return fetch(URL, {
            method: 'GET',
        })
            .then((response) => response.json())
            .then((response) => {
                const { email, name } = response
                const picture = response.picture.data.url

                User.findOne({ email }).exec((err, user) => {
                    if (user) {
                        const user_payload = {
                            id: user.id,
                            name: user.fullName,
                            email: user.email,
                            role: user.role,
                            isVerifyEmail: true
                        }
                        const token = jwt.sign(user_payload, env.passport.jwtToken, {
                            expiresIn: env.passport.jwtAccessExpired,
                        })
                        
                        if(user.isVerifyEmail == false) {
                            user.isVerifyEmail = true
                            user.save()
                        }
                        res.setHeader('Authorization', `Bearer ${token}`)
                        return res.status(httpStatus.OK).send({ user })
                    } else {
                        const min = 100000000000
                        const max = 999999999999
                        const accountNumber = Math.random() * (max - min) + min

                        const address = {}

                        User.findOne({ accountNumber }).exec((err, user) => {
                            if (user) {
                                throw new CustomError('403', 'Account number already taken')
                            } else {
                                user = new User({
                                    fullName: name,
                                    email: email,
                                    password: email + '123456',
                                    address: address,
                                    image: picture,
                                    birthday: '2001-01-01',
                                    sex: null,
                                    accountNumber: String(Math.floor(accountNumber)),
                                    type: 'CN',
                                    role: 'USER',
                                    phone: null,
                                    isVerifyEmail: true,
                                })
                                user.save((err, data) => {
                                    if (err) {
                                        throw new CustomError('500', 'Internet Server Error')
                                    }
                                    const user_payload = {
                                        id: data.id,
                                        name: data.fullName,
                                        email: data.email,
                                        role: data.role,
                                        isVerifyEmail: true
                                    }
                                    const token = jwt.sign(user_payload, env.passport.jwtToken, {
                                        expiresIn: env.passport.jwtAccessExpired,
                                    })
                                    res.setHeader('Authorization', `Bearer ${token}`)
                                    return res.status(httpStatus.OK).send({ user })
                                })
                            }
                        })
                    }
                })
            })
    } catch (err) {
        throw new CustomError('500', 'Internet Server Error')
    }
})

module.exports = {
    login,
    register,
    sendVerificationEmail,
    activateEmailToken,
    updateEmail,
    forgotPassword,
    resetPassword,
    authGoogle,
    authFacebook,
}
