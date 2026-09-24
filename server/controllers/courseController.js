
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