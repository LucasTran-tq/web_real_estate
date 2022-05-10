const {Type} =require('../models')

// const getTypes= async ()=>{
//     return Type.find({});
// }
const getTypesByCategory=async (id)=>{
    return Type.find({
        "category._id":id
    });
}
module.exports={
    getTypesByCategory
}
