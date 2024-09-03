const jwt = require('jsonwebtoken');
const SECRET_KEY = 'gayson';

const authenticateToken =(req,res,next)=>{
    const authHeader =  req.headers.authorization;
  
    if(!authHeader){
        console.log("오류!")
        return res.status(401).json({message:"헤더 토큰 오류"});
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({message: "토큰 오류"});
    }
    jwt.verify(token,SECRET_KEY,(err,decoded)=>{
        if(err){
            console.error("토큰 에러",err);
            return res.status(401).json({ message: "유효하지 않은 토큰입니다." });
    
        }
        req.user=decoded;
        next()
    })
}

module.exports=authenticateToken;