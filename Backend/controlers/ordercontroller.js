import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay';
import send from "../utils/send.js";
import productmodel from "../models/productmodel.js";
import { createHmac, timingSafeEqual } from 'node:crypto';

const getRazorpayInstance = () => {
  if (!process.env.RAZORPAY_ID || !process.env.RAZORPAY_SECRET) {
    throw new Error('Razorpay is not configured on the server. Set RAZORPAY_ID and RAZORPAY_SECRET.')
  }
  return new razorpay({
    key_id: process.env.RAZORPAY_ID,
    key_secret: process.env.RAZORPAY_SECRET
  })
}

const notifyOrderEmails = (email, amount, address) => {
  for (const recipient of ['client', 'admin']) {
    void send(recipient, email, amount, address).catch((error) => {
      console.error(`Order ${recipient} email failed:`, error.message);
    });
  }
}

// Place order (COD)
const placeorder = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });
 
    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const usr = await userModel.findById(userid).select('email');
    const mail = usr?.email;
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
    await userModel.findByIdAndUpdate(userid, { cartData: {} });
    notifyOrderEmails(mail, amount, address);

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




//placing order using razorpay method
const placeorderrazorpay = async (req, res) => {
  try {
    const razorpayinstance = getRazorpayInstance()
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const { items, amount, address } = req.body;

    // SAVE FIRST
    const newOrder = await orderModel.create({
      userid,
      items,
      amount,
      address,
      paymentmethod: "razorpay",
      payment: false,
      date: Date.now(),
    });

    // CREATE RAZORPAY ORDER
    let razorpayOrder;
    try {
      razorpayOrder = await razorpayinstance.orders.create({
        amount: Math.round(Number(amount) * 100),
        currency: "INR",
        receipt: newOrder._id.toString(),
      });
      await orderModel.findByIdAndUpdate(newOrder._id, { razorpayOrderId: razorpayOrder.id });
    } catch (error) {
      await orderModel.findByIdAndDelete(newOrder._id);
      throw error;
    }

    res.json({ success: true, order: razorpayOrder, keyId: process.env.RAZORPAY_ID });
  } catch (error) {
    console.log(error);
    const missingConfig = error.message.includes('not configured on the server');
    res.status(missingConfig ? 503 : 500).json({ success: false, message: error.message });
  }
};

const varifyrazorpay = async (req, res) => {
  try {
    const razorpayinstance = getRazorpayInstance()
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    const { razorpay_order_id: razorpayOrderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body;
    if (!razorpayOrderId) {
      return res.status(400).json({ success: false, message: 'Razorpay order ID is required.' });
    }

    const order = await orderModel.findOne({ userid, razorpayOrderId });
    if (!order) {
      return res.status(404).json({ success: false, message: 'Payment order was not found for this account.' });
    }

    if (!paymentId) {
      if (!order.payment) await orderModel.findByIdAndDelete(order._id);
      return res.json({ success: false, message: 'Payment cancelled' });
    }

    if (!signature || !/^[a-f0-9]{64}$/i.test(signature)) {
      return res.status(400).json({ success: false, message: 'Razorpay payment signature is missing or invalid.' });
    }
    const expectedSignature = createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(`${order.razorpayOrderId}|${paymentId}`)
      .digest();
    const receivedSignature = Buffer.from(signature, 'hex');
    if (receivedSignature.length !== expectedSignature.length || !timingSafeEqual(receivedSignature, expectedSignature)) {
      return res.status(400).json({ success: false, message: 'Payment signature verification failed.' });
    }

    const paymentInfo = await razorpayinstance.payments.fetch(paymentId);
    if (paymentInfo.order_id !== order.razorpayOrderId || paymentInfo.amount !== Math.round(order.amount * 100) || paymentInfo.currency !== 'INR') {
      return res.status(400).json({ success: false, message: 'Payment details do not match this order.' });
    }
    if (paymentInfo.status !== 'captured') {
      return res.status(409).json({ success: false, message: 'Payment is not captured yet. Check Razorpay automatic capture settings.' });
    }

    order.payment = true;
    order.status = 'Order Placed';
    await order.save();
    const usr = await userModel.findById(userid).select('email');
    await userModel.findByIdAndUpdate(userid, { cartData: {} });
    if (usr?.email) notifyOrderEmails(usr.email, order.amount, order.address);

    return res.json({ success: true, message: 'Payment successful' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//all ordders data for admin panel
const allorders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders })
  }
  catch (error) {
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
const updatestatus = async (req, res) => {
  try {
    const { orderid, status } = req.body
    await orderModel.findByIdAndUpdate(orderid, { status })
    res.json({ success: true, message: "status updated" })
  }
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

//checking if the products in the cart are available to be sold

const checkcart = async (req, res) => {
  try {
    const {id,size,qua} =req.body;
    const prod = await productmodel.findById(id);
    if(!prod){
      return res.json({success:false,message:'product not available'})
    }
    const available =prod.quant[size];
    if(available<qua){
      return res.json({success:false,message:`only ${available} ${prod.name} in ${size} size are available`})
    }
    return res.json({success:true,message:'available'})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}

//update all producs buyed 

const updatestock=async(req,res)=>{
  try {
    const{id,size,qua}=req.body;
    const prod=await productmodel.findById(id);
    const available=prod.quant[size]-qua;
    prod.quant[size]=available;
    await prod.save();
    return res.json({success:true,message:"stock updated"})
  } catch (error) {
    return res.json({success:false,message:error.message})
  }
}


export { varifyrazorpay, placeorder, placeorderrazorpay, allorders, userorders, updatestatus ,checkcart,updatestock}
