const moongoose = require("mongoose");
const userSchema = moongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        enum:{
            values:['student','instructor','admin']
        }
    }
},
{
    timestamps:true
});

const User = moongoose.model("User",userSchema);
module.exports = User;