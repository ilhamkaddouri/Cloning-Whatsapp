const {OAuth2Client, UserRefreshClient} = require('google-auth-library')
const client = new OAuth2Client("1080247718906-i35pll533d3drvhk0s2vpqjghs4217qt.apps.googleusercontent.com")
const User = require('../models/User')
const jwt= require('jsonwebtoken')
const googlelogin=(req,res)=>{
    const {tokendId} = req.body;
    client.verifyIdToken({idToken:tokendId, audience: "1080247718906-i35pll533d3drvhk0s2vpqjghs4217qt.apps.googleusercontent.com"}).then(response=>{
        const {email_verified, name,email}= response.getPayload()
        console.log(response.getPayload())
        if(email_verified){
            User.findOne({email}).exec((err,user)=>{
                if(err){
                    return res.status(400).json({
                        error:"Something went wrong"
                    })
                }else{
                    if(user){
                        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET_KEY)
                        const {_id,name,email}= user;
                        res.json({
                            token,
                            user:{_id,name,email}
                        })
                    }else{
                        let password = email+name+"123";
                        let newUser  = new User({name,email,password});

                        newUser.save((err,data)=>{
                            if(err){
                                return res.status(400).json({
                                    error :"Something went wrong.."
                                })
                            }
                            console.log('saved user')
                            const token = jwt.sign({_id: data._id}, process.env.JWT_SECRET_KEY)
                            console.log("token")
                            const {_id,name,email}= newUser;
                            res.send({token,
                            user:{_id,name,email}
                            })
                            
                            
                        })
                    }
                }
            })
        }
    })
    console.log('errir')
}

module.exports = googlelogin