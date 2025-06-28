import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  nom: {type: String, default: "admin"},
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Admin', adminSchema);
