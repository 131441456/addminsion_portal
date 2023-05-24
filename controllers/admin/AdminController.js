const CourseModal = require('../../modals/Course')

class AdminController{

     static dashboard = async(req,res)=>{
        try {
            const {name,email,id, image} = req.user
            const course = await CourseModal.find()
            //console.log(course)
            res.render('admin/dashboard',{n:name, image:image, c:course})
            
        } catch (error) {
            console.log('error')
        }
     }

     static update_status = async(req,res)=>{
        try {
            //console.log(req.body)
            const result = await CourseModal.findByIdAndUpdate(req.params.id,{
                comment: req.body.comment,
                status: req.body.status
            })
            res.redirect('/admin/dashboard')
            
        } catch (error) {
            console.log(error)
        }
     }

}

module.exports = AdminController