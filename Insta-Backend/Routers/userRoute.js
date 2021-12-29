const express=require('express');
const protectRoute=require('../Routers/privateRoute');
const userModel=require('../Models/userModel');
const bcrypt=require('bcrypt');


const userRouter=express.Router();

userRouter.get('/:id',getUserById);
userRouter.put('/:id',updateUser);
userRouter.delete('/:id',deleteUser);




async function getUserById(req,res){
    try {
        const user =await userModel.findById(req.params.id);
        const {password,...other}=user._doc;
        res.status(200).json(other);
        
    } catch (error) {
        res.status(500).json(err);
    }

}
async function updateUser(req,res){
    if(req.body.userId===req.params.id){
        if(req.body.password){
            try {
                const salt=await bcrypt.genSalt(10);
                 req.body.password=await bcrypt.hash(req.body.password,salt);

            } catch(err){
                return res.json({
                    message:err.message,
                })
            }
        }
        try {
            const user =userModel.findByIdAndUpdate(req.params.id,{$set:re.body});
            res.status(200).json({
                message:"Account has been updated"
            })
        } catch (error) {
            return res.status(500).json({
                message:error.message,
            })
        }
    }else{
        return res.status(403).json({
            message:"You can update only your account!!"
        })
    }

}
async function deleteUser(req,res){
    if(re.body.userId===req.params.id || req.body.isAdmin){
        try{
            await userModel.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message:"Account has been deleted"
            })
        }catch(err){
            return res.status(500).json(
                {message:err.message}
            )

        }
    }else{
        return res.status(403).json({
            message:"You can delete only your account"
        })
    }

}


























module.exports=userRouter;