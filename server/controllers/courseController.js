const Course=require('../models/course');
async function getCourse(req,res){
    try{
        const courses=await Course.find()
        return res.status(200).send(courses)
    }
    catch(errpr){
        return res.status(500).send({
            message:"Unable to access the courses"
        })
    }
}

async function createCourse(req,res){
    try{
        const{title,description,category,level,price,duration}=req.body
        if(!title || !description || !category || !level || !price===undefined || !duration){
            return res.status(400).send({
                message:"Bad request"
            })
        }
        const existingCourse=await Course.findOne({title})
        if(existingCourse){
            return res.status(400).send({
                message:"Bad request,Course already exists"
            })
        }
        const course=new Course({
            title:title,
            description:description,
            instructor:req.user._id,
            category:category,
            level:level,
            price:price,
            duration:duration,
        })
        await course.save()
        return res.status(200).send({
            message:"new Course created ",
        })
    }
    catch(err){
        return res.status(500).send({
            message:"Unable to create the course"
        })
    }
}

async function getCourseById(req,res){
    try{
        const {id}=req.params
        const course=await Course.findById(id).populate('instructor','email')
        if(!course){
            return res.status(404).send({
                message:"Bad request: Course not found"
            })
        }
        return res.status(200).send(course)
    }
    catch(err){
        return res.status(500).send({
            message:"Unable to fetch the course"
        })
    }
}
async function updateCourse(req,res){
    try{
        const{id}=req.params
        const course = await Course.findById(id)
        if(!course){
            return res.status(404).send({
                message:"Course not found"
            })
        }
        const editableFields=[
            'title','description','category','level','price','duration'
        ]
        editableFields.forEach(field=>{
            if(req.body[field]!==undefined){
                course[field]=req.body[field]
            }
        })
        await course.save()
        return res.status(200).send({
            message:"Course updated successfully"
        })

    }
    catch(error){
        return res.status(500).send({
            message:"Unable to update the course"
        })
    }


}
async function deleteCourse(req,res){
    try{
        const {id}=req.params

        const course=await Course.findById(id)

        if(!course){
            return res.status(400).send({
                message:"course not found"
            })
        }
        // if(req.user.role!=='instructor' && (!course.instructor || !course.instructor.equals(req.user._id))){
        //     return res.status(403).send({
        //         message:"you can only delete course you created"
        //     })
        // }
        await course.deleteOne({_id:id})

        return res.status(200).send({
            message:"Course deleted successfully"
        })
    }
    catch(error){
        return res.status(500).send({
            message:"Unable to delete the course"
        })
    }
}



module.exports={
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseById
}