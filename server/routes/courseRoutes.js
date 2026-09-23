const  express = require('express')
const courseRoute=express.Router()

courseRoute.get("/",(req,res)=>{
    res.send("course route")
})
courseRoute.post("/",(req,res)=>{
    res.send("course route")
})
courseRoute.get("/:id",(req,res)=>{
    res.send("course route")
})
courseRoute.put("/:id",(req,res)=>{
    res.send("course route")
})
courseRoute.delete("/",(req,res)=>{
    res.send("course route")
})

module.exports = courseRoute