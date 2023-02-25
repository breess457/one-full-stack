const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination :(req,file,cb)=>{
        cb(null,'./image/profile-users')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().getTime().toString()+'-'+file.fieldname+path.extname(file.originalname))
        
    }
})
var upload = multer({ storage:storage })

const storageBlog = multer.diskStorage({
    destination:(req,filex,cb)=>{
        cb(null,'./image/blogImg')
    },
    filename:(req,filex,cb)=>{
        cb(null,new Date().getTime().toString()+'-'+filex.fieldname+path.extname(filex.originalname))
    }
})
var imageBlog = multer({storage:storageBlog})

module.exports = {upload,imageBlog}