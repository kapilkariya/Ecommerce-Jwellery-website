import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";

// Place order (COD)
const placeorder = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id; 

    const { items, amount, address } = req.body;

    const orderdata = {
      userid,       // from token
      items,
      amount,
      address,
      paymentmethod: "COD",
      payment: false,
      status: "Order Placed",
      date: Date.now(),
    };

    const neworder = new orderModel(orderdata);
    await neworder.save();

    await userModel.findByIdAndUpdate(userid, { cartdata: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
//placing order using cod method
const placeorderstripe= async (req,res)=>{

}
//placing order using cod method
const placeorderrazorpay= async (req,res)=>{

}

//all ordders data for admin panel
const allorders= async (req,res)=>{
  try{
    const orders=await orderModel.find();
    res.json({success:true,orders})
  }
  catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//all ordders data for front end
const userorders = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    // Fetch orders, ensure items is always an array
    const orders = await orderModel.find({ userid }).lean();
    const safeOrders = orders.map(order => ({
      ...order,
      items: Array.isArray(order.items) ? order.items : []
    }));

    res.json({ success: true, orders: safeOrders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};



//update order status
const updatestatus= async (req,res)=>{
  try{
    const {orderid,status}=req.body
    await orderModel.findByIdAndUpdate(orderid,{status})
    res.json({success:true,message:"status updated"})
  }
  catch(error){
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}
export {placeorder, placeorderstripe,placeorderrazorpay,allorders,userorders,updatestatus}