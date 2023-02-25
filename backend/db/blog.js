const mongoose = require('mongoose')
    const BlogSchema = mongoose.Schema({
        userId:String,
        newDate:{
            type:Date,
            default:Date.now()
        },
        blogTitle:String,
        blogType:String,
        blogDetail:String,
        blogImage:String
    })
module.exports = mongoose.model('Blognews',BlogSchema)