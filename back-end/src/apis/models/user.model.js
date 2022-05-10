const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const { AddressSchema } = require('./address.model')
const { LikedSchema } = require('./liked.model')

const UserSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 6,
            private: true,
        },
        image: {
            type: String,
        },
        birthday: {
            type: Date,
        },
        sex: {
            type: String,
            default: null,
        },
        cardNumber: {
            type: String,
            minLength: 9,
            maxLength: 12,
            default: null,
        },
        accountNumber: {
            type: String,
            minLength: 9,
            maxLength: 12,
            default: null,
        },
        money: {
            type: Number,
            min: 0,
            maxLength: 1000000000,
            default: 0,
        },
        address: {
            type: AddressSchema,
        },
        phone: {
            type: String,
            maxLength: 10,
            default: null,
        },
        type: {
            type: String,
            enum: ['CN', 'DN'],
            default: 'CN',
        },
        role: {
            type: String,
            enum: ['USER', 'ADMIN'],
            default: 'USER',
        },
        isVerifyEmail: {
            type: Boolean,
            default: false,
        },
        likeds: {
            type: [LikedSchema],
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
UserSchema.statics.isEmailTaken = async function (email, excludeUserId) {
    const user = await this.findOne({ email, _id: { $ne: excludeUserId } })
    return !!user
}

UserSchema.statics.isCardNumberTaken = async function (cardNumber, excludeUserId) {
    const user = await this.findOne({ cardNumber, _id: { $ne: excludeUserId } })
    return !!user
}

UserSchema.statics.isAccountNumberTaken = async function (accountNumber, excludeUserId) {
    const user = await this.findOne({ accountNumber, _id: { $ne: excludeUserId } })
    return !!user
}

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
UserSchema.methods.isPasswordMatch = async function (password) {
    const user = this
    return bcrypt.compare(password, user.password)
}

UserSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10)
    }
    next()
})

const User = mongoose.model('user', UserSchema)

module.exports = {
    UserSchema,
    User,
}
