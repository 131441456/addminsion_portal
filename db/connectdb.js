const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/admissionportal"

const connectdb = ()=>{
    // For local DB
    return mongoose.connect(url)
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
