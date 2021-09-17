const jwt = require("jsonwebtoken");

const isAuth = (req,res,next) => {
    const jwtToken = req.header("Authorization").split(" ")[1];
    console.log(jwtToken);
    jwt.verify(jwtToken,"supersecretsentence",(err,result) => {
        if(err){
            return res.status(401).json({
                msg:"invalid token",
                status:401
            }) 
        }
        if(!result){
            return res.status(401).json({
                msg:"invalid token",
                status:401
            })
        }
        req.email = result.email;
        req.userId = result.userId;
        next();
    })
}
module.exports = isAuth;