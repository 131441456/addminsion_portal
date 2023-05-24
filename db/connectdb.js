const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/admissionportal"
const live_url = "mongodb+srv://shivani123:<shivani123>@cluster0.z5d3eek.mongodb.net/"

const connectdb = ()=>{
    // For local DB
    return mongoose.connect(live_url)
    // For cloud DB
    // return mongoose.connect(database)
    
    .then(()=>{
        console.log("Connected Succeessfully")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports=connectdb
