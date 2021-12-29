
const{PRIVATE_KEY}=require("../secrets");
const jwt=require("jsonwebtoken");

function protectRoute(req,res,next){
    console.log("inside protect route");
    try {
        console.log("inside protect route2");
        if(req.cookies.jwt){
            console.log(req.cookies.jwt);
            console.log("inside protect route3");
            let isVerified=jwt.verify(req.cookies.jwt,PRIVATE_KEY);
            console.log(isVerified);
            console.log("inside protect route4");
            if(isVerified){
                console.log("Inside protect route 5");
                req.uid=isVerified.id;
                next();
            }
        }else{
            res.status(401).json({
                message:"Your are not autorized"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            message:"Server Error aaaaaa"
        })
        
    }

}



module.exports=protectRoute;