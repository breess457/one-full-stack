require('dotenv').config()
require('./db/connect').connect()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Users = require('./router/users.route')
const Blog = require('./router/blog.route')
const path = require('path')
const serveStatic = require('serve-static')
const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:false
})) 
app.use('/imgprofile/',serveStatic(path.join(__dirname,'image')),(req, res, next)=>{
    console.log('suceess')
    next()
})

app.use(function(req, res, next){
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
    next()
})


app.get('/',(req, res)=>{
    res.json({
        massege :"Hellow Express Backend",

    })
})



app.use('/',Users)
app.use('/',Blog)
app.listen(PORT,()=>{
    console.log(`start server on post :${PORT}`)
})