import mongoose from "mongoose";

const convertiSchema = new mongoose.Schema({
  nom: String,
  prenom: String,
  profession: String,
  quartier: String,
  sexe: String,
  telephone: { type: String, unique: true }
});

export default mongoose.model("Converti", convertiSchema);
