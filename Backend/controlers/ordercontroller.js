import orderModel from "../models/ordermodel.js";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import razorpay from 'razorpay';
import sendmail from "../utils/sendmail.js";
import send from "../utils/send.js";

const currency = 'inr'
const deliverycharge = 10

const razorpayinstance = new razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET
})

// Place order (COD)
const placeorder = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false, message: "Not authorized" });

    // Decode token to get userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const usr = await userModel.findById(userid).select('email')
    const mail = usr.email;

    const { items, amount, address } = req.body;

    send('client', mail, amount, address);
    send('admin', mail, amount, address);


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
    // sendmail()
    await userModel.findByIdAndUpdate(userid, { cartdata: {} });

    res.json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




//placing order using razorpay method
const placeorderrazorpay = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;
    const usr = await userModel.findById(userid).select('email')
    const mail = usr.email;

    const { items, amount, address } = req.body;

    send('client', mail, amount, address);
    send('admin', mail, amount, address);

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
    const razorpayOrder = await razorpayinstance.orders.create({
      amount: Number(amount) * 100,
      currency: "INR",
      receipt: newOrder._id.toString(), // link exact order
    });

    res.json({ success: true, order: razorpayOrder });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const varifyrazorpay = async (req, res) => {
  try {
    const token = req.headers.token;
    if (!token) return res.status(401).json({ success: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userid = decoded.id;

    const { razorpay_order_id, razorpay_payment_id } = req.body;

    const orderinfo = await razorpayinstance.orders.fetch(razorpay_order_id);

    // PAYMENT SUCCESS
    if (razorpay_payment_id) {
      await orderModel.findByIdAndUpdate(orderinfo.receipt, {
        payment: true,
        status: "Order Placed"
      });
      const usr = await userModel.findById(userid).select('email');
      const mail = usr.email;

      const order = await orderModel.findById(orderinfo.receipt);

      send('client', mail, order.amount, order.address);
      send('admin', mail, order.amount, order.address);

      await userModel.findByIdAndUpdate(userid, { cartdata:{}});

      return res.json({ success: true, message: "Payment successful" });
    }

    // PAYMENT CANCELLED - DELETE ORDER
    await orderModel.findByIdAndDelete(orderinfo.receipt);

    return res.json({ success: false, message: "Payment cancelled" });
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
export { varifyrazorpay, placeorder, placeorderrazorpay, allorders, userorders, updatestatus }