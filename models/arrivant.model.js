import mongoose from "mongoose";

const arrivantSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  profession: String,
  quartier: String,
  sexe: String,
  telephone: { type: String, unique: true },
  createdAt: Date 
});

export default mongoose.model("Arrivant", arrivantSchema);
