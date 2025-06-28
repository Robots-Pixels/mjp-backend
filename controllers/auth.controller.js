import mongoose from "mongoose";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";

export const login = async (req, res) => {
  const {password} = req.body;

  try {
    if (password === process.env.ADMIN_PASSWORD){
      res.json({
        token: process.env.ADMIN_TOKEN
      });
    }
    else{
      res.status(401).json({ 
        status : false,
        message: 'Mot de passe incorrect' 
      });
    }

  } catch (err) {
    res.status(500).json({ 
      status : false,
      message: 'Une erreur est survenue. Veuillez réésayer'
  })
};
}

export const adminSignUp = async (req, res) => {
  const { password } = req.body;

  if (!password) {
    return res.status(401).json({
      status: false,
      message: "Mot de passe requis !"
    });
  }

  if (password.trim().length < 8 || !/\d/.test(password)) {
    return res.status(401).json({
      status: false,
      message: "Le mot de passe doit contenir au moins 8 caractères et au moins un chiffre."
    });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const admin = new Admin({
      nom: "admin",
      password: hashedPassword
    });

    await admin.save();

    return res.status(200).json({
      status: true,
      message: "Merci. Votre compte Admin a été créé avec succès! veillez m'avertir s'il vous plait."
    });

  } catch (error) {
    console.error(error); // log technique utile
    return res.status(500).json({
      status: false,
      message: "Une erreur est survenue, veuillez réessayer."
    });
  }
};
