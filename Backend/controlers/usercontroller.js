
import validator from 'validator';
import bcrypt from 'bcrypt';
import userModel from '../models/usermodel.js';
import jwt from 'jsonwebtoken';

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET,{ expiresIn: "7d" });
}
const findUserByEmail = (email) => userModel.findOne({
  email: { $regex: `^${email.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}$`, $options: 'i' }
});
//route for user login 
const loginuser = async (req, res) => {
  try {
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required." })
    }

    const user= await findUserByEmail(email);
    if(!user){
      return res.status(401).json({ success: false, message: "Invalid email or password." })
    }
    if (!user.password) {
      return res.status(400).json({ success: false, message: "This account uses Google sign-in. Please continue with Google." })
    }
    const ismatch = await bcrypt.compare(password,user.password);
    if(ismatch){
      const token= createToken(user._id)
      return res.json({success:true, token, userid: user._id, email: user.email})
    }
    else{
      return res.status(401).json({ success: false, message: "Invalid email or password." })
    }
 
  }
  catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

//route for user register
const registeruser = async (req, res) => {
  try {
    const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
    const password = typeof req.body.password === 'string' ? req.body.password : '';
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Name, email, and password are required." });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }
    //checking if user exists
    const exists = await findUserByEmail(email);
    if (exists) {
      return res.status(409).json({ success: false, message: "An account with this email already exists. Please log in." })
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
    res.status(201).json({success:true,token, userid: user._id, email: user.email})
  }
  catch (error) { 
    console.log(error)
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: "An account with this email already exists. Please log in." });
    }
    res.status(500).json({ success: false, message: "Server error" })
  }
}

const deleteuser=async(req,res)=>{
  try {
    const token=req.headers.token;
    console.log('token :'+token)
    if(!token) return res.json({success:false,message:'user unauthorized'})
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const userid=decoded.id;
    await userModel.findByIdAndDelete(userid);
    return res.json({success:true,message:'account deleted'})
  } catch (error) {
    return res.json({success:false,message:error.message})
    console.log(error)
  }
}

//route for admin login
const adminlogin = async (req, res) => {
  try {
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

//adding address

const addaddress=async(req,res)=>{
  try {
    const token=req.headers.token;
    if(!token) return res.json({success:false,message:'user unauthorized'})
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    const userid=decoded.id;
    const user = await userModel.findById(decoded.id);
     if (user.address.length >= 2) {
      return res.json({
        success: false,
        message: 'You can add only 2 addresses'
      });
    }
    const usr=await userModel.findByIdAndUpdate(userid,{$push:{address:req.body.address}},{new:true});
    res.json({success:true,message:'address saved'})
  } catch (error) {
    res.json({success:false,message:error.message})
  }
}

const getuser = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id).select("-password");
    res.json({ success: true, user });
  } catch {
    res.json({ success: false, message: "Invalid token" });
  }
};


// to remove address of user
const deluser = async (req, res) => {
  try {
    const token = req.headers.token;
    const { index } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.json({ success: false, message: 'User not found' });
    }
    if (index < 0 || index >= user.address.length) {
      return res.json({ success: false, message: 'Invalid address index' });
    }
    // remove address at index
    user.address.splice(index, 1);
    await user.save();
    res.json({ success: true, message: 'Address removed', address: user.address });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



export { loginuser, registeruser, adminlogin,deleteuser, addaddress, getuser ,deluser}
