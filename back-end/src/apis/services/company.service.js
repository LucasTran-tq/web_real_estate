const { Company } = require('../models')

const getInfo = async () => {
    return Company.find({})
}

const updateInfo = async (infoBody) => {
    return Company.updateOne({},infoBody)
}

module.exports = {
    getInfo,
    updateInfo,
}
