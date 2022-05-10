const { Liked } = require('../models')



const getLikedByUser = async (userID) => {
    return Liked.find({ user_id: userID })
}

const getLiked = async () => {
    return Liked.find({})
}

module.exports = {
    getLikedByUser,
    getLiked
}
