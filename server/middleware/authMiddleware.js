const jwt = require("jsonwebtoken")
require("dotenv").config()

const authMiddleware = (req,res,next) =>{
    
    const authHeader = req.header('Authorization');
    
    if(!authHeader ||  !authHeader.startsWith("Bearer")){
        throw new Error("Empty token")
    }
    
    const token = authHeader.split(" ")[1];
 
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
        req.user = decoded; 

       
    }
    catch(error){
        res.status(400).json({message : "Invalid Token"})
    } 
    next();
};

module.exports = authMiddleware;
 
