const UserModal = require('../modals/User')
const CourseModal = require('../modals/Course')
const bcrypt = require('bcrypt');
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const nodemailer =require('nodemailer')

cloudinary.config({ 
    cloud_name: 'dxtu2a3dq', 
    api_key: '542969987575726', 
    api_secret: 'Dplj9_UMacDAXMRM2O00oDOoyS4',
    
  });


class FrontController {

    static dashboard = async(req, res) => {

        try {
            //console.log(req.user)
            
            const {name,email,id, image} = req.user
            const btech = await CourseModal.findOne({user_id:id, course:'btech'})
            const bca = await CourseModal.findOne({user_id:id, course:'bca'})
            const mca = await CourseModal.findOne({user_id:id, course:'mca'})
            res.render("dashboard", {n:name, image:image, b:btech, bc:bca, mc:mca})

        } catch (error) {
            console.log(error)
        }
        
    }

    static login = (req, res) => {
        res.render("login", { message: req.flash('success'),error:req.flash('error') })
    }

    static register = async (req, res) => {
        try {
            res.render("registrasion", { message: req.flash('error') })
        } catch (error) {
            console.log('error');
        }

    }
    static insert = async (req, res) => {

        //console.log(req.files.image)
        const file = req.files.image;
        const imageUpload = await cloudinary.uploader.upload(file.tempFilePath,{

            folder:'studentimage'
        })
       // console.log(imageUpload)
        const { name, email, password, cpassword } = req.body
        const user = await UserModal.findOne({ email: email })
        //console.log(user)
        if (user) {
            req.flash('error', 'Email already exist.')
            res.redirect('/register')//path is given
        } else {
            if (name && email && password && cpassword) {
                if (password == cpassword) {

                    try {
                        const hashpassword = await bcrypt.hash(password,10)
                        const result = new UserModal({

                            name: name,
                            email: email,
                            password: hashpassword,
                            image:{
                                public_id:imageUpload.public_id,
                                url:imageUpload.secure_url
                            }
                        })

                        await result.save()
                        this.sendEmail(name, email)
                        req.flash('success', 'Registration successfully! Please Login Here')
                        res.redirect('/')//path is given

                    } catch (error) {
                       console.log(error)
                    }

                } else {
                    req.flash('error', 'Password and confirm password does not match.')
                    res.redirect('/register')
                }
            } else {
                req.flash('error', 'All Field are required.')
                res.redirect('/register')
            }
        }

    }
    
    static verify_login = async(req,res)=>{


    try {

        //console.log(req.body)

        const {email,password} = req.body
        if(email && password){
            const user = await UserModal.findOne({email:email})
           // console.log(user)
           if(user != null){
              const ismatch = await bcrypt.compare(password, user.password)
              if(ismatch){
                //multiple login
                if(user.role == 'student'){
                    //generate token
                    const token = jwt.sign({ ID: user._id }, 'shivanibansal@123#8962');
                    //console.log(token)
                    res.cookie('token',token)
                    res.redirect('/dashboard')
                }
                if(user.role == 'admin'){
                    //generate token
                    const token = jwt.sign({ ID: user._id }, 'shivanibansal@123#8962');
                    //console.log(token)
                    res.cookie('token',token)
                    res.redirect('/admin/dashboard')
                }
              }
              else{
                req.flash('error', 'Email password is not valid.')
            res.redirect('/')
              }
           }
           else{
            req.flash('error', 'You are not register user.')
            res.redirect('/')
           }
        }
        else{
            req.flash('error', 'All Field are required.')
         res.redirect('/')
        }
        
    } catch (error) {
        console.log('error');
    }

    }

    static logout = async(req, res)=>{
        try {
            res.clearCookie('token')
            res.redirect('/')
        } catch (error) {
            console.log('error');
            
        }
    }

    static profile = async(req, res)=>{
        try {
            const {name,email,id, image} = req.user
            res.render('profile',{n:name, image:image, email:email, message: req.flash('success'),error:req.flash('error') })
            
            
        } catch (error) {
            console.log('error')
        }
    }

    static change_password = async(req, res)=>{
        try {
            const {name,email,id, image} = req.user
            // console.log(req.body)
            const{oldpassword, newpassword, cpassword} = req.body
            if(oldpassword && newpassword && cpassword){
                const user = await UserModal.findById(id)
                const ismatch = await bcrypt.compare(oldpassword, user.password)
                if(!ismatch){
                    req.flash('error', 'Old Password is incorrect')
                    res.redirect('/profile')
                }
                else{
                    if(newpassword !== cpassword){
                        req.flash('error', 'Password and confirm password is not matched')
                        res.redirect('/profile')
                    }
                    else{
                         const newHashpassword = await bcrypt.hash(newpassword, 10)
                         await UserModal.findByIdAndUpdate(id,{
                            $set: {password:newHashpassword}

                         })
                         req.flash('message', 'Password Change successfully')
                         res.redirect('/logout')
                    }
                }

            }
            else{
                req.flash('error', 'All Field are required.')
                res.redirect('/profile')
            }
            
            
        } catch (error) {
            console.log('error')
        }
    }
    static profile_update = async (req, res) => {
        try {
            //console.log(req.files.image)
            if (req.files) {
                const user = await UserModal.findById(req.user.id);
                const image_id = user.image.public_id;
                await cloudinary.uploader.destroy(image_id);

                const file = req.files.image;
                const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: "studentimage",

                });
                var data = {
                    name: req.body.name,
                    email: req.body.email,
                    image: {
                        public_id: myimage.public_id,
                        url: myimage.secure_url,
                    },
                };
            } else {
                var data = {
                    name: req.body.name,
                    email: req.body.email,

                }
            }
            const update_profile = await UserModal.findByIdAndUpdate(req.user.id, data)
            res.redirect('/profile')
        } catch (error) {
            console.log(error)
        }
    }

    
    static sendEmail = async (name, email) => {
        // console.log("email sending")
        //consollog("propertyName")
        // console.log(email)
    
        //connenct with the smtp server
    
        let transporter = await nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
    
          auth: {
            user: "shivanibansal8962@gmail.com",
            pass: "blpdwonrijqrcbfq",
          },
        });
        let info = await transporter.sendMail({
          from: "test@gmail.com", // sender address
          to: email, // list of receivers
          subject: "Now you can Registrate for the course", // Subject line
          text: "heelo", // plain text body
          html: `<b>${name}</b> Registration is successfully! plz login.. `, // html body
        });
        //console.log("Messge sent: %s", info.messageId);
    };
    



}



module.exports = FrontController