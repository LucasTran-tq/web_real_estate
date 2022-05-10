const { Province, District, Ward, RealEstate } = require('../models')

const getProvinces = async () => {
    return Province.find({})
}

const getDistrictsByProvince = async (provinceID) => {
    return District.find({ province_Id: provinceID })
}

const getWardsByDistrict = async (districtID) => {
    return Ward.find({ district_Id: districtID })
}

const getProvinceInfo = async (provinceID) => {
    return Province.find({_id : provinceID})
}

const getDistrictInfo = async (districtID) => {
    return District.find({_id : districtID})
}

const getWardInfo = async (wardID) => {
    return Ward.find({_id : wardID})
}

const getTopProvinces = async () => {
    return RealEstate.aggregate(
        [
            { 
                $match : { "type.category.code" : "SALE" } 
            },
            {
                $lookup:
                {
                    from: "provinces",
                    localField: "detail.address.province_Id",
                    foreignField: "_id",
                    as: "province"
                }
            },
            {
                $group: {           
                    _id: "$province",
                    amount:{$sum:1}
                }
            },
            {
                $sort : { amount: -1 }
            },
            {
                $limit : 5
            }
        ]
    )
}

module.exports = {
    getProvinces,
    getDistrictsByProvince,
    getWardsByDistrict,
    getProvinceInfo,
    getDistrictInfo,
    getWardInfo,
    getTopProvinces
}
