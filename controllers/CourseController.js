const CourseModal = require('../modals/Course')

class CourseController {
 
    static course_insert = async(req,res)=>{
        try {
        //    console.log(req.body)

        const result = new CourseModal({
            name: req.body.name,
            email: req.body.email,
            mobile_number: req.body.mobile_number,
            address: req.body.address,
            gender: req.body.gender,
            qualification: req.body.qualification,
            course:req.body.course,
            user_id:req.user.id

        })
        await result.save()
        req.flash('success','Course Registration successfully!')
        res.redirect('/course_display')
           
       
      
        } catch (error) {
            console.log('error')
        }
    }

    static Course_display = async(req,res)=>{
        try {
            const {name,email,id, image} = req.user
            const data = await CourseModal.find({user_id:id})
            
            // console.log(data);
            res.render('courses/display',{d:data,message:req.flash('success'), n:name, image:image});
            
        } catch (error) {
            console.log(error)
        }
    }

    static Course_view = async(req,res)=>{
        try {
            //console.log(req.params.id)
            const data = await CourseModal.findById(req.params.id)
            const {name,email,_id, image} = req.user
             //console.log(data);
            res.render('courses/view',{d:data, n:name, image:image});
            
        } catch (error) {
            console.log(error)
        }
    }

    static Course_edit = async(req,res)=>{
        try {
            //console.log(req.params.id)
            const data = await CourseModal.findById(req.params.id)
            const {name,email,_id, image} = req.user
             //console.log(data);
            res.render('courses/edit',{d:data, n:name, image:image});
            
        } catch (error) {
            console.log(error)
        }
    }

    static Course_update = async(req,res)=>{
        try {
            
            //console.log(req.body);
            //console.log(req.params.id);
            const update = await CourseModal.findByIdAndUpdate(req.params.id,{

                name: req.body.name,
                email: req.body.email,
                mobile_number: req.body.mobile_number,
                address: req.body.address,
                gender: req.body.gender,
                qualification: req.body.qualification,
                course:req.body.course

            })
            req.flash('success','Update successfully!')
            res.redirect('/course_display')
            
        } catch (error) {
            console.log(error)
        }
    }

    static Course_delete = async(req,res)=>{

        try {

            const update = await CourseModal.findByIdAndDelete(req.params.id)
            req.flash('success','Delete successfully!')
            res.redirect('/course_display');
            
        } catch (error) {
            console.log(error)
        }

    }

    

}
module.exports = CourseController