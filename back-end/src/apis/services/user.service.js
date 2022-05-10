const httpStatus = require('http-status')
const bcrypt = require('bcryptjs')
const CustomError = require('../../utils/custom-error')
const { User, Liked, RealEstate } = require('../models')
const env = require('../../configs/env')

const getUsers = async (querySearch) => {
    console.log(querySearch)
    const { sort, page, userID, role } = querySearch
    // Filter
    let formSearch = {}
    if (userID && userID != 'all') {
        formSearch['_id'] = userID
    }
    if (role != 'all' && role) {
        formSearch['role'] = role
    }
    console.log(formSearch)
    // Sort
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Ten tai khoan tu A -> Z
            sortProperty = 'fullName'
            ascOrDesc = 1
            break
        case '1': // Ten tai khoan tu Z -> A
            sortProperty = 'fullName'
            ascOrDesc = -1
            break
        case '2': // Ngay tao tai khoan tu cu  -> moi
            sortProperty = 'createdAt'
            ascOrDesc = 1
            break
        case '3': // Ngay tao tai khoan tu moi -> cu
            sortProperty = 'createdAt'
            ascOrDesc = -1
            break
        default:
            // Ten tai khoan tu A -> Z
            sortProperty = 'fullName'
            ascOrDesc = -1
            break
    }
    const countUsers = await User.countDocuments(formSearch)
    const users = await User.find(formSearch)
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)
    return {
        users,
        lengthDocuments: countUsers,
    }
}

const createUser = async (userBody) => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new CustomError('401', 'Email already taken')
    }
    if (await User.isCardNumberTaken(userBody.cardNumber)) {
        throw new CustomError('402', 'Card number already taken')
    }
    if (await User.isAccountNumberTaken(userBody.accountNumber)) {
        throw new CustomError('403', 'Account number already taken')
    }
    return User.create(userBody)
}

const updateUser = async (userID, userBody) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'User not found')
    }
    return User.findByIdAndUpdate(userID, userBody, {
        new: true,
    })
}

const updateEmail = async (email, new_email) => {
    const user = await User.findOne({ email })

    if (await User.isEmailTaken(new_email)) {
        throw new CustomError('401', 'Email already taken')
    }

    user.email = new_email

    user.save((err, data) => {
        if (err) {
            throw new CustomError('406', 'Lưu thông tin không thành công')
        }
    })
    return user
}

const changePassword = async (userID, oldPassword, newPassword) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) throw new CustomError('404', 'User not found')

    const match = await bcrypt.compare(oldPassword, foundUser.password)
    if (match) {
        foundUser.password = newPassword
        foundUser.save()
        return 'Change successfull'
    }
    throw new CustomError('409', 'Wrong password')
}

const deleteUser = async (userID) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) throw new CustomError(httpStatus.NOT_FOUND, 'User not found')
    if (foundUser.role === 'ADMIN') throw new CustomError(httpStatus.BAD_REQUEST, 'Can not delete user as role ADMIN')
    return User.findByIdAndDelete(userID)
}

const getUserByEmail = async (email) => {
    return User.findOne({ email })
}

const getUserByID = async (userID) => {
    return User.find({ _id: userID })
}

const getUserByID2 = async (userID) => {
    return User.find({ _id: userID }).populate({
        path: 'address',
        populate: ['province_Id', 'district_Id', 'ward_Id'],
    })
}

const checkCardNumber = async (cardNumber) => {
    return User.find({ cardNumber: cardNumber })
}

const likeRealEstate = async (userID, realEstateID) => {
    const foundUser = await User.findById(userID)
    const foundRealEstate = await RealEstate.findById(realEstateID)
    if (!foundUser) {
        throw new CustomError(httpStatus.NOT_FOUND, 'User not found')
    }

    if (!foundRealEstate) {
        throw new CustomError(httpStatus.NOT_FOUND, 'Real Estate not found')
    }

    const likeds = foundUser.likeds

    const foundRealEstateLiked = likeds.find((like) => like.realEstate == realEstateID)

    if (foundRealEstateLiked) {
        //unlike
        foundUser.likeds = likeds.filter((like) => like !== foundRealEstateLiked)
    } else {
        //like
        const likedInfo = new Liked({
            realEstate: realEstateID,
        })
        foundUser.likeds.unshift(likedInfo)
    }

    return foundUser.save()
}

const authorization = async (userID, role) => {
    const foundUser = await User.findById(userID)
    if (!foundUser) {
        throw new CustomError(httpStatus.BAD_GATEWAY, 'User not found')
    }
    if (['ADMIN', 'USER'].indexOf(role) === -1) {
        throw new CustomError(httpStatus.BAD_GATEWAY, `Not authorized ${role}`)
    }
    foundUser.role = role
    return foundUser.save()
}
const getRealEstate = async (userEmail, page, sort, user) => {
    let sortProperty
    let ascOrDesc
    let aa = page
    switch (sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'aa'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = '_id.dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = '_id.dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = '_id.detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = '_id.detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = '_id.detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = '_id.detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'aa'
            ascOrDesc = -1
            break
    }
    let like_user = User.aggregate(
        [
            {
                $match: { "email": userEmail }
            },
            {
                $group: {
                    _id: "$likeds"
                }
            },
            {
                $lookup:
                {
                    from: "realestates",
                    localField: "_id.realEstate",
                    foreignField: "_id",
                    as: "like_detail",
                }
            },
            {
                $addFields: {
                    Entities: {
                        $map: {
                            input: "$_id",
                            as: "e",
                            in: {
                                $mergeObjects: [
                                    "$$e",
                                    {
                                        $arrayElemAt: [
                                            {
                                                $filter: {
                                                    input: "$like_detail",
                                                    as: "j",
                                                    cond: {
                                                        $eq: [
                                                            "$$e.realEstate",
                                                            "$$j._id"
                                                        ]
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                ]
                            }
                        }
                    }
                }
            },
            {
                $project: {
                    art: "$Entities"
                }
            },
            {
                $group: {
                    _id: "$art"
                }
            },
            {
                $unwind : '$_id'
            },
            {
                $sort: { [sortProperty]: ascOrDesc}
            },
            // {
            //     $skip: 20 * aa
            // },            
            // {
            //     $limit: 20
            // },
        ]
    )
    return like_user
}
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    getUserByEmail,
    getUserByID,
    updateEmail,
    authorization,
    getUserByID2,
    checkCardNumber,
    likeRealEstate,
    getRealEstate
}
