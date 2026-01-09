import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import userModel from '../models/usermodel.js';
import passport from 'passport';


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done)=> {
    try {
      let user= await userModel.findOne({googleId:profile.id});
      if(!user){
        user=await userModel.create({
          googleId:profile.id,
          name:profile.displayName,
          email:profile.emails[0].value,
          avatar:profile.photos[0].value,
        })
      }
      return done(null,user);
    } catch (error) {
      return done(error,null)
    }
  }
));