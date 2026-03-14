import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  userId:      { type: String, required: true },
  orderId:     { type: String, required: true },
  productId:   { type: String, required: true },
  productName: { type: String, default: '' },
  userName:    { type: String, default: '' },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  comment:     { type: String, default: '' },
  date:        { type: Date, default: Date.now }
});

// Enforce one feedback per product per order
feedbackSchema.index({ orderId: 1, productId: 1 }, { unique: true });

const feedbackModel = mongoose.models.feedback || mongoose.model('feedback', feedbackSchema);

export default feedbackModel;
