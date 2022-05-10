const httpStatus = require('http-status')
const sgMail = require('@sendgrid/mail')
const jwt = require('jsonwebtoken')

const tokenService = require('./token.service')
const userService = require('./user.service')

const CustomError = require('../../utils/custom-error')
const env = require('../../configs/env')

const sendVerificationEmail = async (verifyEmailToken, email) => {
    console.log(env.app.schema)
    const url = `${process.env.CLIENT_URL}/activate/${verifyEmailToken}`
    const emailData = {
        from: '19522353@gm.uit.edu.vn', //must use only this email which is registered with account in website Sendgrid cuz this account owns MAIL_KEY
        to: email,
        subject: 'Account activation link',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">NHADAT website</h2>
            <p>HOUSEV xin chào bạn! <br>
            Chỉ một bước duy nhất nữa thôi, bạn sẽ chính thức trở thành một trong những người dùng của trang web chúng tôi.<br>
            Một đường dẫn xác thực đã được tạo và có hiệu lực trong vòng <span style="color: crimson"> <b>5 phút</b></span>!<br>
            Vui lòng chọn vào nút xác thực để hoàn tất thủ tục.
            </p>

            <form action=${url}>
                <button type="submit" 
                        style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Xác thực email</button>
            </form>
        `,
    }
    sgMail.setApiKey(process.env.MAIL_KEY) // MAIL_KEY in .env
    return sgMail.send(emailData).catch((err) => {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
    })
}

const activateEmailToken = async (verifyEmailToken) => {
    try {
        jwt.verify(verifyEmailToken, process.env.PASSPORT_JWT_ACCOUNT_ACTIVATION)
        const { email } = jwt.decode(verifyEmailToken)
        const user = await userService.getUserByEmail(email)
        user.isVerifyEmail = true
        user.save()
    } catch (err) {
        throw new CustomError('402', err.message)
    }
}

const sendResetPasswordEmail = async (resetPasswordToken, email) => {
    console.log(env.app.schema)
    const url = `${process.env.CLIENT_URL}/reset/${resetPasswordToken}`
    const emailData = {
        from: '19522353@gm.uit.edu.vn', //must use only this email which is registered with account in website Sendgrid cuz this account owns MAIL_KEY
        to: email,
        subject: 'Reset password link',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">NHADAT website</h2>
        <p>HOUSEV xin chào bạn!<br>
        Một đường dẫn liên kết đến trang thay đổi mật khẩu đã được tạo và có hiệu lực trong vòng <span style="color: crimson"> <b>5 phút</b></span>!<br>
        Vui lòng nhấn nút dưới đây để tiến hành việc đổi mật khẩu.
        </p>
        <form action=${url}>
        <button type="submit" 
            style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">Đổi mật khẩu</button>
        </form>
        `,
    }
    sgMail.setApiKey(process.env.MAIL_KEY) // MAIL_KEY in .env
    return sgMail.send(emailData).catch((err) => {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
    })
}

const resetPassword = async (token, password) => {
    try {
        jwt.verify(token, process.env.PASSPORT_JWT_RESET_PASSWORD)
        const { email } = jwt.decode(token)
        const user = await userService.getUserByEmail(email)
        console.log('email is ' + email)
        user.password = password
        user.save()
    } catch (err) {
        throw new CustomError(httpStatus.INTERNAL_SERVER_ERROR, err.message)
    }
}

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<boolean>}
 */
const logout = async (refreshToken) => {
    const refreshTokenDoc = await tokenService.getTokenByRefresh(refreshToken, false)
    if (!refreshTokenDoc) {
        throw new CustomError(httpStatus.NOT_FOUND, 'Not found')
    }
    await refreshTokenDoc.remove()
    return true
}

module.exports = {
    sendVerificationEmail,
    activateEmailToken,
    logout,
    sendResetPasswordEmail,
    resetPassword,
}
