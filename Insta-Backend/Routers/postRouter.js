const express =require('express');
const userModel=require('../Models/userModel');
const protectRoute =require('../Routers/privateRoute');
const postModel=require('../Models/postModel');


const postRouter=express.Router();


postRouter.post('/',protectRoute,createPost);
postRouter.put('/:id',protectRoute,updatePost);
postRouter.delete('/:id', protectRoute,deletePost);
postRouter.put('/:id/like',protectRoute,likePost);
postRouter.get('/:id',protectRoute,getPost);



async function createPost(req,res){
    const newPost=new postModel(req.body);
    try {
        const savePost=await newPost.save();
        res.status(200).json({
            message:"post created Successfully",
            createdPost:savePost,
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
        
    }

}
async function updatePost(req,res){
    try {
        const post=await postModel.findById(req.params.id);
        if(post.userId===req.body.userId){
            await postModel.updateOne({$set:req.body});
            res.status(200).json({
                message:"The post has been updated ",
            })
        }else{
            res.status(403).json({
                message:"You are not allowed to update someone's else post",

            }
            )
        }
        
    } catch (error) {
        res.status(500).json({
            message:error.message,
        })
    }

}
async function deletePost(req,res){
    try {
        const post=await postModel.findById(req.params.id);
        if(post.userId===req.body.userId){
            await postModel.deleteOne();
            res.status(200).json({
                message:"The post has been deleted"
            })
        }else{
            res.status()
        }
        
    } catch (error) {
        
    }

}
async function likePost(req,res){
    try {
        const post=await postModel.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push:{likes:req.body.userId}});
            res.status(200).json({
                message:"The post has been liked"
            }) 
        }else{
            await post.updateOne({$pull:{likes:req.body.userId}});
            res.status(200).json({
                message:"The post has been disliked"
            })
        }
        
    } catch (error) {

        res.status(500).json({
            message:error.message,
        })
        
    }

}
async function getPost(req,res){
    try {
        const post=await postModel.findById(req.params.id);
        res.status(200).json({
            post:post,
        })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
        
    }
}

module.exports=postRouter;