import feedbackModel from '../models/feedbackmodel.js';
import orderModel from '../models/ordermodel.js';
import userModel from '../models/usermodel.js';
import productmodel from '../models/productmodel.js';

// POST /api/feedback/submit  (authuser)
const submitFeedback = async (req, res) => {
  try {
    const { userId, orderId, productId, productName, rating, comment } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.json({ success: false, message: 'Rating must be between 1 and 5' });
    }

    // Confirm order exists and belongs to user
    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: 'Order not found' });
    }
    if (order.userid !== userId) {
      return res.json({ success: false, message: 'Unauthorized' });
    }
    if (order.status !== 'Delivered') {
      return res.json({ success: false, message: 'Feedback can only be submitted for delivered orders' });
    }

    // Check for duplicate
    const existing = await feedbackModel.findOne({ orderId, productId });
    if (existing) {
      return res.json({ success: false, message: 'Feedback already submitted for this product' });
    }

    // Get user name
    const user = await userModel.findById(userId).select('name email');
    const userName = user?.name || user?.email || 'Customer';

    // Save feedback
    const feedback = new feedbackModel({
      userId,
      orderId,
      productId,
      productName: productName || '',
      userName,
      rating,
      comment: comment || '',
    });
    await feedback.save();

    res.json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.log(error);
    if (error.code === 11000) {
      return res.json({ success: false, message: 'Feedback already submitted for this product' });
    }
    res.json({ success: false, message: error.message });
  }
};

// POST /api/feedback/check  (authuser)
const checkFeedback = async (req, res) => {
  try {
    const { orderId, productId } = req.body;
    const existing = await feedbackModel.findOne({ orderId, productId });
    res.json({ success: true, submitted: !!existing });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// POST /api/feedback/list  (adminauth)
const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await feedbackModel.find().sort({ date: -1 });
    res.json({ success: true, feedbacks });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { submitFeedback, checkFeedback, getAllFeedback };
