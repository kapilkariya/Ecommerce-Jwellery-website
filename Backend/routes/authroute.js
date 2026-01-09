import express from 'express'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import authuser from '../middleware/auth.js'

const router=express.Router();


router.get('/google',passport.authenticate("google",{scope:['profile','email']}))

router.get('/google/callback',
  passport.authenticate('google',{session:false}),
  (req,res)=>{
    try {
      console.log('CLIENT_URL:', process.env.CLIENT_URL); 
      const token=jwt.sign({id:req.user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
      res.redirect(`${process.env.CLIENT_URL}/login?token=${token}`)
    } catch (error) {
      console.log("google errror",error)
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`)
    }
  }
)

router.get('/me',authuser,(req,res)=>{
  res.json({success:true,user:req.user})
})

export default router;