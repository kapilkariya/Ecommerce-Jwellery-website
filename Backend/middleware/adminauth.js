import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

const adminauth = async (req, res, next) => {
  try{
    const token=req.headers.token
    if(!token){
      return res.json({success:false,message:"unauthorized access"})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    
    // Check if it's the legacy admin token format
    if(token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return next();
    }
    
    // Check if it's a user token with admin email
    if(token_decode && token_decode.id){
      const user = await usermodel.findById(token_decode.id);
      if(user && user.email === process.env.ADMIN_EMAIL){
        req.body.userId = token_decode.id;
        return next();
      }
    }
    
    return res.json({success:false,message:"unauthorized access"})
  }
  catch(error){
    return res.json({success:false,message:"unauthorized access"});  
  }
}

export default adminauth;