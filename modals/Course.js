const mongoose= require("mongoose");

const CourseSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    mobile_number:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    qualification:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        require:true,
    },
    status:{
        type:String,
        default:'pending'
    },
    comment:{
        type:String,
    }
    
},{timestamps:true})

//create collection

const CourseModal = mongoose.model('course',CourseSchema)

module.exports = CourseModal;



