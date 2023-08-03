const jwt=require("jsonwebtoken");
const LoginMiddleware=(req,res,next)=>{
const token=req.headers.auth;
if(token){
    const decode=jwt.verify(token,"loginornot")
    req.body.userId=decode.userId;
if(decode){
    next()
}
else{
    res.send("Login first");
}
}
}
module.exports={LoginMiddleware}