const mongoose = require('mongoose')
const {MONGO_URL} = process.env

exports.connect = ()=>{
    mongoose.connect(MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("Connnected MongoDB to success fully *_*"))
    .catch((err)=>{
        console.log("Error connecting to database!")
        console.log(err)
        process.exit(1)
    })
}