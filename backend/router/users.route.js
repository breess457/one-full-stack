const route = require('express').Router()
const User = require('../db/db')
const setMulter = require('../middleware/multel')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyparser = require('body-parser')
const verifyToken = require('../middleware/verifytoken')

route.post('/login/',async (req , res, next)=>{

    try{
        const username = req.body.username;
        const password = req.body.password;
        
        if(!(username && password)){
            res.status(400).json({
                type:'warning',
                text:'โปรดป้อนข้อมูลทั้งสองช่อง',
                msg:"set input username or password"
            })
        }else{
            const userx = await User.findOne({ username:username })
            if(userx &&(await bcrypt.compare(password , userx.password))){
                const token = jwt.sign(
                    {user_id:userx._id, username:username,fullname:userx.profile.fullname},
                    process.env.TOKEN_KEY,
                    {expiresIn:"1d"}
                )
                
                userx.token = token
                //res.cookie('token',token,{httpOnly:true,maxAge: 24 * 60 * 60 * 1000})
                res.json({token})
                
            }else{
              res.status(404).json({
                type:'error',
                text:'ข้อมูล ไม่ถูกต้อง',
                msg:'username or password false not user on db'
              })
            }
        }
        
    }catch(e){
        res.status(402).json({
            msg:'username or password false not user try'
          })
    }

    
})
route.post('/signup/',setMulter.upload.single('image'),async function(req, res, next){
    try{
        const {username,password,fullname,age,sex,home,district1,district2,province,zipcode} = req.body
        console.log(req.body)
        if(!(username && password)){
            res.status(400).json({
                type:"error",
                text:"not input all",
                msg:"All Input is required"
            })
        }
        const oldUser = await User.findOne({username:username})
            if(oldUser){
                return res.status(403).json({
                    type:'warning',
                    text:'username ซ้ำ',
                    msg:"ไม่สามารถเพิ่มได้ เนื้องจาก username ซ้ำ"
                })

            }
                const encryptedPassword = await bcrypt.hash(password,10)
                
                const user = await User.create({
                    username:username,
                    password:encryptedPassword,
                    newDate:Date(),
                    profile:{
                        fullname:fullname,
                        age:age,
                        sex:sex,
                        home:home,
                        location:{
                            district1:district1,
                            district2:district2,
                            province:province,
                            zipcode:zipcode,
                        },
                        photoImg:req.file.filename
                    }
                })
                const token = jwt.sign(
                    {user_id:user._id,username:username,fullname:fullname},
                    process.env.TOKEN_KEY,
                    { expiresIn:"2h" }
                )
                user.token = token
                res.status(200).json({token})
            

    }catch(err){
        console.log(err.response)
    }
})

route.get('/profile/', verifyToken,async function(req, res){
    try{
       const user = await User.findById(req.user.user_id).select('-password')
       res.json(user)
    }catch(err){
        console.log(err)
        res.status(500).send('Server Error')
    }
})

route.put('/edit/profile/detailprofile/:_id',async function(req ,res){
    console.log(req.body)
    try{
        const editProfile = await User.findOneAndUpdate(
            {"_id":req.params._id},
            {$set:{
                "profile.sex":req.body.sex,
                "profile.age":req.body.age,
                "profile.occupation":req.body.occupation,
                "profile.status":req.body.status,
                "profile.quotation":req.body.quotation,
                "profile.location.district1":req.body.SubdistrictInput,
                "profile.location.district2":req.body.DistrictInput,
                "profile.location.province":req.body.Province,
                "profile.location.zipcode":req.body.Postacode,
            }},
            {new :true}
        )
        res.status(200).json({
            icon:"success",
            text:"edit success",
            msg:"เพิ่มข้อมูลเรียบร้อย",
            data:editProfile
        })
    }catch(e){
        console.log("error:" +e)
    }
})

route.get('/getuser',  (req, res)=>{
    try{
         User.find({},(err, data)=>{
            if(err){
                res.status(402).json(err)
            }else{
               res.status(200).json(data)
            }
        })
    }catch(error){
        console.log(error)
        res.status(404).send(error)
    }
})
route.get('/user/userAuther/:_id',(req,res)=>{
    try{
        const getUserId = req.params._id
        console.log(getUserId)
        User.findById(getUserId,(err,data)=>{
            if(err){
                res.status(402).json(err)
            }else{
                res.status(200).json(data)
            }
        }).select('-password')

    }catch(e){
        console.log(e)
        res.status(404).send("Error try")
    }
})

route.delete('/logout/',async(req, res)=>{
    const refToken = req.headers['x-access-token']
    
        if(!refToken) return res.status(401).send("not token")
        const user = await User.find({
            token:refToken
        })
        console.log(user)
        if(!user){
        res.status(204).send('not user')
        }else{
            const userId = user._id
            await User.updateOne({token:null},{_id:userId})
            res.clearCookie('x-access-token')
            res.status(200).send('ok logout success')
        }
})
route.post('/test/',(req, res)=>{
    console.log("ObjectId("+req.body._id+")")
    res.send("ObjectId('"+req.body._id+"')")

})




module.exports = route