const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const cors  = require("cors")
const dotenv = require("dotenv")
const bcrypt =require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("./config")
dotenv.config()
const port = process.env.port

const db = require("./db")
const User = require("./src/models/userSchema")

const authController = require("./src/controllers/authController")

app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({}))

app.get("/",(req,res)=>{
res.send("home")
})

app.use('/api/Auth',authController)

app.listen(port,(e)=>{if(e){console.log(e)}console.log("server runing on:",port)})