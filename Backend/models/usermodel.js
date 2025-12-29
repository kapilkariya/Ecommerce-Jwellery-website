import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cartData: { type: Object, default: {} }
}, { minimize: false })
//this means dont remove empty objects when saving daata

const userModel = mongoose.models.user || mongoose.model('user', userSchema);

export default userModel