  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    avatar: { type: String },
    cartData: { type: Object, default: {} },
    address: { type: [Object], default: [] }
  }, {
    minimize: false,
    collection: 'users'      // ✅ explicit — forces "users" collection, no prefix
  });

  // ✅ use a single canonical model name and reuse it if it already exists
  const userModel = mongoose.models.user || mongoose.model('user', userSchema);

  export default userModel;