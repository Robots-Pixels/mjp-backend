import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  nom: {
    type: String,
    unique: true, // garantit l’unicité
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.model('Admin', adminSchema);
