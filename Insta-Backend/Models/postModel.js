const mongoose= require("mongoose");


let postSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,

    },
    desc:{
        type:String,
        max:500,
    },
    img:{
        type:String,
    },
    likes:{
        type:Array,
        default:[],

    },
},
{timestamps:true}
);


const postModel=mongoose.model("Post",postSchema);
module.exports=postModel;