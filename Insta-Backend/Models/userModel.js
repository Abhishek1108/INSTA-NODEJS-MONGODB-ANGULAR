const mongoose=require('mongoose');
const {DB_LINK}=require('../secrets.js');
mongoose.connect(DB_LINK,{

}).then(function(db){
  console.log(db);
}).catch(function(err){
    console.log(err);
})


let userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:7,

    },
    confirmPassword:{
        type:String,
        minlength:7,
        validate:function(){
            return this.password==this.confirmPassword;
        }
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    token:String,

})

userSchema.pre('save',function(next){

    this.confirmPassword=undefined;
    next();
})

const userModel=mongoose.model('users',userSchema);

module.exports=userModel;