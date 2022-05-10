const { RealEstate, Province, District, Ward } = require('../models')
const CustomError = require('../../utils/custom-error')
const httpStatus = require('http-status')
const env = require('../../configs/env')

const getRealEstatesSale = async (page, sort, user) => {
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = 'dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = 'detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = 'detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = 'detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = 'detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
    }
    let realEstates = await RealEstate.find({ 'type.category.code': env.categories.sale })
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }
    return realEstates
}

const getRealEstatesRent = async (page, sort, user) => {
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = 'dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = 'detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = 'detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = 'detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = 'detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
    }
    let realEstates = await RealEstate.find({ 'type.category.code': env.categories.rent })
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }

    return realEstates
}

const getRealEstatesSaleByProvince = async (page, sort, user, province) => {
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = 'dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = 'detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = 'detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = 'detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = 'detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
    }
    let realEstates = await RealEstate.find({
        'type.category.code': env.categories.sale,
        'detail.address.province_Id': province,
    })
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }
    return realEstates
}

const createRealEstate = async (realestate) => {
    const province = await Province.findById(realestate.detail.address.province_Id)
    if (!province) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'Province not found')
    }
    const district = await District.findById(realestate.detail.address.district_Id)
    if (!district) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'District not found')
    }
    const ward = await Ward.findById(realestate.detail.address.ward_Id)
    if (!ward) {
        throw new CustomError(httpStatus.BAD_REQUEST, 'Ward not found')
    }
    return RealEstate.create(realestate)
}

const getRealEstateInfo = async (realEstateID, user) => {
    const realEstate = await RealEstate.find({ _id: realEstateID }).populate({
        path: 'detail.address',
        populate: ['province_Id', 'district_Id', 'ward_Id'],
    })
    realEstate[0]._doc.tym = false
    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let tym = likeds.indexOf(String(realEstateID)) != -1 ? true : false
        realEstate[0]._doc.tym = tym
    }
    return realEstate
}


const getRealEstateByProvineId = async (realestate, user) => {
    let realEstates = await RealEstate.find({ 'detail.address.province_Id ': realestate }).limit(16)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }
    return realEstates
}
// const getRealEstateByDistrictId = async (realestate) => {
//     return RealEstate.find({ 'detail.address.district_Id': realestate })
// }
// const getRealEstateByWardId = async (realestate) => {
//     return RealEstate.find({ 'detail.address.ward_Id': realestate })
// }

// const getRealEstateBySquare = async (square1,square2) => {
//     return RealEstate.find(
//     ).where('detail.square').lte(square1).gte(square2);
// }

const getRealEstateBySearch = async (form,user) => {
    // console.log(form);
    const province = form.province_Id ? form.province_Id : null;
    const district = form.district_Id ? form.district_Id : null;
    const ward = form.ward_Id ? form.ward_Id : null;
    const square1 = form.square1 ? form.square1 : null;
    const square2 = form.square2 ? form.square2 : null;
    const price1 = form.price1 ? form.price1 : null;
    const price2 = form.price2 ? form.price2 : null;
    const numBedroom = form.numBedroom ? form.numBedroom : null;
    const directOfHouse = form.directOfHouse ? form.directOfHouse : null;
    const category = form.category ? form.category : null;
    const note = form.note ? form.note : null;
    const type = form.type ? form.type : null;
    const project = form.project ? form.project : null;
    const obj = {};
    if (province != null) {
        obj['detail.adress.province_Id'] = province
    }
    if (district != null) {
        obj['detail.address.district_Id'] = district
    }
    if (ward != null) {
        obj['detail.address.ward_Id'] = ward
    }
    if (note != null) {
        obj['detail.address.note'] = note
    }
    if (square1 != null) {
        obj['detail.square'] = {
            $gte: square1,
        }
    }
    if (square2 != null) {
        obj['detail.square'] = {
            $lte: square2,
        }
    }
    if (price1 != null) {
        obj['detail.totalPrice'] = {
            $gte: price1,
        }
    }
    if (price2 != null) {
        obj['detail.totalPrice'] = {
            $lte: price2,
        }
    }
    if (numBedroom != null) {
        obj['detail.numBedroom'] = {
            $gte: numBedroom,
        }
    }
    if (directOfHouse != null) {
        obj['detail.directOfHouse'] = directOfHouse
    }
    if (category != null) {
        obj['type.category.name'] = category
    }
    if (type != null) {
        obj['type.name'] = type
    }
    if (project != null) {
        obj['project'] = project
    }

    let sortProperty
    let ascOrDesc
    switch (form.sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = 'dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = 'detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = 'detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = 'detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = 'detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
    }
    let realEstates = await RealEstate.find(obj)
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * form.page)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        realEstates =  realEstatesWithTym
    }
    const countRealEstate = await RealEstate.countDocuments(obj)

    return {realEstates, lengthDocuments: countRealEstate}
}

const getNewestRealEstateBydateUploaded = async (date) => {
    return RealEstate.find({ dateUpload: date }).sort({ dateUpload: -1 }).limit(8)
}
const getNewestRealEstate = async (user) => {
    let realEstates = await RealEstate.find({}).sort({ dateUpload: -1 }).limit(16)
    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })
    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }
    return realEstates
}


const getRealEstates = async () => {
    return RealEstate.find({})
}

const countDocumentsByProvince = async (categoryCode, province) =>
    RealEstate.countDocuments({ 'type.category.code': categoryCode, 'detail.address.province_Id': province })

const countDocuments = async (categoryCode) => RealEstate.countDocuments({ 'type.category.code': categoryCode })

const countDocumentsByTypeID = async (typeID) => RealEstate.countDocuments({ 'type._id': typeID })

const getRealEstatesByTypeID = async (page, sort, user, typeID) => {
    let sortProperty
    let ascOrDesc
    switch (sort) {
        case '0': // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '1': // Bài đăng mới -> cũ
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
        case '2': // Bài đăng cũ -> mới
            sortProperty = 'dateUpload'
            ascOrDesc = 1
            break
        case '3': // Giá thấp -> cao
            sortProperty = 'detail.totalPrice'
            ascOrDesc = 1
            break
        case '4': // Giá cao -> thấp
            sortProperty = 'detail.totalPrice'
            ascOrDesc = -1
            break
        case '5': // Diện tích từ bé -> lớn
            sortProperty = 'detail.square'
            ascOrDesc = 1
            break
        case '6': // Diện tích từ lớn -> bé
            sortProperty = 'detail.square'
            ascOrDesc = -1
            break
        default:
            // Bài đăng mới trước default
            sortProperty = 'dateUpload'
            ascOrDesc = -1
            break
    }
    let realEstates = await RealEstate.find({ 'type._id': typeID })
        .populate({
            path: 'detail.address',
            populate: ['province_Id', 'district_Id', 'ward_Id'],
        })
        .sort({ [sortProperty]: ascOrDesc })
        .limit(env.pageLimit)
        .skip(env.pageLimit * page)

    realEstates = realEstates.map((realEstate) => {
        realEstate._doc.tym = false
        return realEstate
    })

    if (user) {
        const likeds = user.likeds.map((liked) => {
            return String(liked.realEstate)
        })
        let realEstatesWithTym = realEstates.map((realEstate) => {
            let tym = likeds.indexOf(String(realEstate._id)) != -1 ? true : false
            realEstate._doc.tym = tym
            return realEstate
        })
        return realEstatesWithTym
    }
    return realEstates
}

const getRealEstatesByUser = async (querySearch, user) => {
    // const formSearch = { 'author._id': user._id }

    let formSearch = {}
    if (user.role === 'USER') formSearch = { 'author._id': user._id }

    if (querySearch.dateStart) {
        formSearch['dateUpload'] = { $gt: querySearch.dateStart }
    }
    if (querySearch.dateEnd) {
        if (querySearch.dateStart) formSearch['dateUpload']['$lt'] = querySearch.dateEnd + 'T12:59:59'
        else formSearch['dateUpload'] = querySearch['dateUpload'] = { $lt: querySearch.dateEnd }
    }
    if (querySearch.realEstateID) {
        formSearch['_id'] = querySearch.realEstateID
    }
    if (querySearch.categoryID) {
        formSearch['type.category._id'] = querySearch.categoryID
    }
    if (querySearch.typeID) {
        formSearch['type._id'] = querySearch.typeID
    }
    if (querySearch.provinceID) {
        formSearch['detail.address.province_Id'] = querySearch.provinceID
    }
    const realEstates = await RealEstate.find(formSearch)
        .limit(env.pageLimit)
        .skip(env.pageLimit * querySearch.page)

    const countRealEstates = await RealEstate.countDocuments(formSearch)

    return {
        realEstates,
        lengthDocuments: countRealEstates,
    }
}

const deleteRealEstate = async (realEstateID) => {
    const foundRealEstate = await RealEstate.findById(realEstateID)
    if (!foundRealEstate) {
        throw new CustomError(httpStatus.BAD_REQUEST, `Real Estate ${realEstateID} not found`)
    }
    return RealEstate.findByIdAndDelete(foundRealEstate)
}

module.exports = {
    getRealEstatesSale,
    getRealEstatesRent,
    countDocuments,
    getRealEstateInfo,
    createRealEstate,
    getRealEstateByProvineId,
    getNewestRealEstateBydateUploaded,
    getNewestRealEstate,
    getRealEstateBySearch,
    getRealEstates,
    getRealEstatesSaleByProvince,
    countDocumentsByProvince,
    getRealEstatesByUser,
    getRealEstatesByTypeID,
    countDocumentsByTypeID,
    deleteRealEstate,
}
