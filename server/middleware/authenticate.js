const jwt = require("jsonwebtoken");
const table = require("../models/userSchema");
const keysecret = "arqfgstrafrwthkjiugthvfdckigtcft"


const authenticate = async(req,res,next)=>{

    try {
        const token = req.headers.authorization;
        
        const verifytoken = jwt.verify(token,keysecret);
        
        const rootUser = await table.findOne({_id:verifytoken._id});
        
        if(!rootUser) {throw new Error("user not found")}
        
//modifying th req
        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({status:401,message:"Unauthorized no token provided"})
    }
}


module.exports = authenticate