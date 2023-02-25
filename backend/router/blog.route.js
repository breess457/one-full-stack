const route = require('express').Router()
const Blognews = require('../db/blog')
const setMulter = require('../middleware/multel')

route.post('/blog/create/',setMulter.imageBlog.single('image'),async (req, res,next)=>{
    console.log(req.body)
    try{
        console.log(req.body)
        const {UserId,BlogTitle,BlogType,blogdetail} = req.body
        const newBlog = await new Blognews({
            userId:UserId,
            blogTitle:BlogTitle,
            blogType:BlogType,
            blogDetail:blogdetail,
            blogImage:req.file.filename
        }).save()
        return res.status(201).json({
            icon:"success",
            msg:"insert success",
            text:newBlog
        })
    }catch(e){
        console.log(e.response)
    }
})

route.get('/blog/blogme/:_id',(req, res, next)=>{
    try{
        const getId = req.params._id
        console.log("id"+ getId)
        Blognews.find({userId: getId},function(err, data){
            if(err){
                res.status(401).json(err)
            }else{
                res.status(200).json(data)
            }
        })
    }catch(e){
        console.log('error :' + e)
        res.status(404).send(e)
    }
})

route.get('/blog/blogall/',(req,res,next)=>{
    try{
        Blognews.find({},(error,data)=>{
            if(error){
                res.status(402).json(error)
            }else{
                res.status(200).json(data)
            }
        })
    }catch(errors){
        console.log("error: "+ errors)
        res.status(404).send('error set router')
    }
})

route.get('/blog/bloglimit',(req,res,next)=>{
    try{
        Blognews.find({},(err,data)=>{
            if(err){
                res.status(402).json(err)
            }else{
                res.status(200).json(data)
            }
        }).limit(10)
    }catch(err){
        console.log('error: '+err)
        res.status(404).send("error failed try")
    }
})

route.get('/blog/blogDetail/:_id',(req,res,next)=>{
    try{
        const getBlogId = req.params._id
        Blognews.findOne({_id:getBlogId},(err,data)=>{
            if(err){
                res.status(401).json(err)
            }else{
                res.status(200).json(data)
            }
        })
    }catch(e){
        console.log(e)
        res.status(404).send("error try catch")
    }
})


module.exports = route