const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/admissionportal"
const live_URL = "mongodb+srv://shivanibansal:shivani123@cluster0.brlsgvm.mongodb.net/addminsionportal?retryWrites=true&w=majority"

const connectdb = ()=>{
    // For local DB
    return mongoose.connect(live_URL)
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
