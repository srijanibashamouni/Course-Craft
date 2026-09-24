const  express = require('express')
const courseRoute=express.Router()

const {protect,authorize} = require('../middleware/authMiddleware')
const { getCourse, createCourse,updateCourse,deleteCourse,getCourseById} = require('../controllers/courseController')

courseRoute.get("/",getCourse)
courseRoute.post("/",protect,authorize('instructor','admin'),createCourse)
courseRoute.get("/:id",getCourseById)

courseRoute.put("/:id",protect,authorize('instructor','admin'),updateCourse)
courseRoute.delete("/:id",protect,authorize('instructor','admin'),deleteCourse)


module.exports = courseRoute