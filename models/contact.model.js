import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  prenom: {
    type: String,
    required: true,
    trim: true
  },
  adresse: {
    type: String,
    required: true,
    trim: true
  },
  quartier: {
    type: String,
    trim: true
  },
  Sexe: {
    type: String,
    enum: ['Masculin', 'Féminin'], 
    trim: true
  },
  profession: {
    type: String,
    trim: true
  },
  telephone: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^01\d{8}$/.test(v); // commence par 01, puis 8 chiffres => 10 au total
      },
      message: props => `${props.value} n'est pas un numéro de téléphone valide. Il doit commencer par 01 et avoir 10 chiffres.`
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
},

{ timestamps: true }
);

// Empêche les doublons exacts : même nom + prénom + téléphone
contactSchema.index({ nom: 1, prenom: 1, telephone: 1 }, { unique: true });

export default mongoose.model('Contact', contactSchema);
