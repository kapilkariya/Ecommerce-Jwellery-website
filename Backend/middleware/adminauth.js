import jwt from 'jsonwebtoken';
import usermodel from '../models/usermodel.js';

const adminauth = async (req, res, next) => {
  try{
    const token=req.headers.token
    if(!token){
      return res.status(401).json({success:false,message:"Unauthorized access. Please log in again."})
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    
    // Check if it's the legacy admin token format
    if(token_decode === process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
      return next();
    }
    
    // Check if it's a user token with admin email
    if(token_decode && token_decode.id){
      const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
      if (!adminEmail) {
        return res.status(503).json({success:false,message:"Admin access is not configured on the backend. Set ADMIN_EMAIL in the backend environment."});
      }
      const user = await usermodel.findById(token_decode.id);
      if(user && user.email?.trim().toLowerCase() === adminEmail){
        // Multipart requests have no parsed req.body until multer runs after this
        // middleware, so keep authenticated identity on the request itself.
        req.userId = token_decode.id;
        return next();
      }
    }
    
    return res.status(403).json({success:false,message:"This account is not authorized to manage products."})
  }
  catch(error){
    return res.status(401).json({success:false,message:"Your session is invalid or expired. Please log in again."});
  }
}

export default adminauth;
