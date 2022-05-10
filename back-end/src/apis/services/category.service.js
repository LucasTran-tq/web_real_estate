const {Category} =require('../models')

const getCategories= async ()=>{
    return Category.find({});
}
module.exports={
    getCategories
}
