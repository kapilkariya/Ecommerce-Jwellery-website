
import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}
//route for user login 
const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user= await userModel.findOne({email});
    if(!user){
      return res.json({ success: "false", message: "user doesnot exists" })
    }
    const ismatch = await bcrypt.compare(password,user.password);
    if(ismatch){
      const token= createToken(user._id)
      res.json({success:true, token})
      localStorage.setItem('userid', user._id);
    }
    else{
      return res.json({ success: "false", message: "invalid credentials" })
    }
 
  }
  catch (error) {
    console.log(error)
    res.json({ success: "false", message: error.message })
  }
}

//route for user register
const registeruser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //checking if user exists
    const exists = await userModel.findOne({email});
    if (exists) {
      return res.json({ success: "false", message: "user already exists" })
    }
    if (!validator.isEmail(email)) {
      return res.json({ success: "false", message: "please enter valid email" })
    }
    if (password.length < 8) {
      return res.json({ success: "false", message: "please enter strong password" })
    }

    //hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newuser=new userModel({
      name,
      email,
      password:hashedPassword
    })

    const user= await newuser.save();
    const token =createToken(user._id)
    res.json({success:true,token})
  }
  catch (error) { 
    console.log(error)
    res.status(500).json({ success: false, message: "Server error" })
  }
}

//route for admin login
const adminlogin = async (req, res) => {
  try {
    console.log(req.body)
    const { email, password } = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
      const token= jwt.sign(email+password,process.env.JWT_SECRET);
      res.json({ success: true, token })
    }
    else{
      res.json({ success: false, message: "Invalid credentials" })
    }
  }
  catch (error) {
    res.json({ success: false, message: error.message })
  }
}

export { loginuser, registeruser, adminlogin }