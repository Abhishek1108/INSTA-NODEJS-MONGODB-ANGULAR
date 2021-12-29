const express=require('express');
const userModel=require('../Models/userModel.js');
const emailSender=require('../ExternalServices/mailer.js');
const protectRoute=require("../Routers/privateRoute");
const jwt=require("jsonwebtoken");
const {PRIVATE_KEY}=require('../secrets');

const authRouter = express.Router();

authRouter.post('/signup',signupUser);
authRouter.post('/login',loginUser);
authRouter.post('/forgotpassword',protectRoute,forgotPassword);
authRouter.post('/resetpassword',protectRoute,resetPassword);



async function signupUser(req,res){
    try {
        let userObj=req.body;
        let user=await userModel.create(userObj);
        res.status(200).json({
            message:"User created successfully",
            createdUser:req.body
        })
        
    } catch (error) {

        res.status(500).json({
            message:error.message
        })
        
    }

}
async function loginUser(req,res){

    try {
        if(req.body.email){
            let{email,password}=req.body;
            let user=await userModel.findOne({email:email});
            if(user.password==password){

                //json web token 
                let payload=user['_id'];
                console.log(user['_id']);
                console.log(payload);
                let jwToken=jwt.sign({id:payload},PRIVATE_KEY);
                res.cookie('jwt',jwToken,{httpOnly:true});
                return res.status(200).json({
                    message:"User logged in successfully",
                    user:user
                })
            }else{
                return res.status(200).json({
                    message:"Email or password is mismatch",
                })

            }
        }else{
            return res.status(401).json({
                message:"Email is not present"
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:error.message+'aaaaaaa'
        })
        
    }

}
async function resetPassword(req,res){
    let {token,password,confirmPassword}=req.body;
    try {
        if(token){
            let user=await userModel.findOne({token});
            if(user){
                user.password=password;
                user.confirmPassword=confirmPassword;
                user.token=undefined;
                await user.save();
                return res.status(200).json({
                    message:"Your Password Change Successfully Chill"
                })
            }else{
                return res.status(404).json({
                    message:"User not Found"
                })
            }

        }else{
            return res.status(500).json({
                message:"Please enter the OTP "
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message:"Server Error"
        })
        
    }

}
async function forgotPassword(req,res){
    console.log("forgotpassword");
    let email=req.body.email;
    console.log(email);
    let OTP=(Math.floor(Math.random()*10000)+10000).toString().substring(1);
    try {
        if(email){
            console.log("Inside Forgotpassword");
            await userModel.updateOne({email},{token:OTP});
             let user=await userModel.findOne({email});
             await emailSender(OTP,email);
             if(user?.token){
                 return res.status(200).json({
                     message:"Email sent"+OTP
                 })
             }else{
                 return res.status(404).json({
                     message:"User Not Found"
                 })
             }

        }else{
            return res.status(400).json({
                message:'Please enter the email'
            })
        }
        
    } catch (error) {

        return res.status(500).json({
            message:error.message
        })
        
    }

}
























module.exports=authRouter;