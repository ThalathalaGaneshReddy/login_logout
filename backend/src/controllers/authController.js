const express = require("express")
const router = express.Router()
const bodyParser = require("body-parser") 
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const config = require("../../config")
const User = require("../models/userSchema")
const axios = require("axios")
const request = require("request")
const session= require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; 

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json({}))


//get all users
router.get("/getAllUsers",async (req,res)=>{
    let result = await User.find({})
    res.status(500).send(result)
})

router.post("/register",async (req,res)=>{
    let hashpassword = bcrypt.hashSync(req.body.password,10)
    
    let addedUser = await User.create({
        "email":req.body.email,
        "name": req.body.name,
        "phone":req.body.phone,
        "age":req.body.age,
        "gender":req.body.gender,
        "accounts":req.body.accounts,
        "code":hashpassword
    })
    if(addedUser){ 
        res.status(200).send("register successfuly")
    }else{
        res.status(200).send("User not register")
    }
})

router.post("/login", async (req,res)=>{
    let user = await User.findOne({email:req.body.email}) 
    if(user){
        const password = req.body.password
        const passIsValid = bcrypt.compareSync(password,user.code)
        console.log("passIsValid",passIsValid)
        if(!passIsValid){
            res.status(500).send({auth:false,payload:"not valid password"})
        }else{
            let token = jwt.sign({id:user._id},config.secret,{expiresIn:86400})
            res.send({auth:true,token:token})
        }
    }else{
        res.status(500).send({auth:false,payload:"User not found"})
    }
})

router.get('/userInfo', async (req,res)=>{
    let token = req.headers['access-token'] 
    if(!token){
        res.send({auth:false,payload:"no token provided"})
    }else{
        jwt.verify(token,config.secret,async (err,user)=>{
            if(err){res.send({auth:false,payload:"invalid token"})}
            else{
                let result = await User.findById(user.id,{code:0})
                res.send(result)
            }
        })
    }
})

//login with githud 
router.get("/loginWithGithub",(req,res)=>{
    res.send(`<a href="https://github.com/login/oauth/authorize?client_id=51aefdb4588c54e6f21b">login with git</a>`)
})
router.get('/gitHubUserInfo', async (req,res)=>{
      const code = req.query.code

      if(!code){
        res.send({
            type:false,
            message:"error while login"
        })
      }else{
        let sendData = {
            client_id :"",
            client_secret:"",
            code:code
        }
         axios.post("https://github.com/login/oauth/access_token",sendData,{
            headers:{
                "Accept": "application/json"
            }
         }).then((response)=>{  
            let accesstoken  =  response.data.access_token 
             const option = {
                url :"https://api.github.com/user",
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "Authorization":`Bearer ${accesstoken}`,
                    "User-Agent":"mycode"
                }
            }
            request(option,(err,result,body)=>{
                res.send(body)
            }) 
         }
         ).catch((err)=>{
            res.send({
                type:false,
                message:"error while login (22)"
        })})
      }
})

//login with google
router.use(session({
    secret:'SUPERSECRET',
    resave:false,
    saveUninitialized:true
}))


router.use(passport.initialize());
router.use(passport.session());

router.get('/loginWithGoogle',(req,res) => {
    res.send('<a href="/api/Auth/google">Login With Google</a>')
})

router.get('/profile',(req,res) => {
    res.send(userprofile)
})

passport.deserializeUser((user,done) => {
    done(null,{
        provider:user.provider,
        id: user.provider_id
    })
})

passport.serializeUser((user,cb)=>{
    cb(null,user)
})

passport.use(new GoogleStrategy({
    clientID: ' ',
    clientSecret: ' ',
    callbackURL: "http://localhost:9800/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    userprofile = profile;
    return done(null,userprofile)
  }
));


router.get('/google',
  passport.authenticate('google', { scope: ['profile','email'] }));

router.get('/googleUserInfo', 
  passport.authenticate('google', { failureRedirect: '/loginWithGoogle' }),
  function(req, res) {
    res.redirect('/profile');
  });


module.exports = router;