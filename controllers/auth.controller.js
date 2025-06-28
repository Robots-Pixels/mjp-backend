import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const login = async (req, res) => {
  const { password } = req.body;

  try {
    const admin = await Admin.findOne({ nom: "admin" });
    if (!admin) {
      return res.status(401).json({
        status: false,
        message: 'Identifiants incorrects'
      });
    }

    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({
        status: false,
        message: 'Mot de passe incorrect'
      });
    }

    const token = jwt.sign(
      { id: admin._id, username: admin.nom }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    console.log(token);

    res.json({
      status: true,
      message: "Connexion réussie",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: false,
      message: 'Une erreur est survenue. Veuillez réessayer.'
    });
  }
};

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
