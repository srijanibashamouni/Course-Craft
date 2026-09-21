const express = require("express")

const app = express()

app.get("/welcome", (req, res)=>{
    res.send("Welcome back")
})


app.listen(1000, ()=>{
    console.log("listening to the PORT")
})