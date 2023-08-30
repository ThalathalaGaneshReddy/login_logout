const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:String,
     name:String,
     code:String,
     email:String,
     phone:String,
     gender:String,
     age:Number,
     accounts:Array
})
const collectionName = "userdata"
mongoose.model("users",userSchema,collectionName)

module.exports = mongoose.model('users')