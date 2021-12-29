const express=require("express");
const authRouter = require("./Routers/authRouter");
const postRouter=require('./Routers/postRouter');
const userRouter=require('./Routers/userRoute');
const cookieParser=require('cookie-parser');
const app=express();
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth',authRouter);
app.use('/api/posts',postRouter);
app.use('/api/users',userRouter);
app.listen(3000,function(){
    console.log("server is startrd ");
})
