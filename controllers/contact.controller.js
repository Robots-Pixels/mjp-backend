import Contact from '../models/contact.model.js';

export const checkAuth  = async (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  console.log('Authorization header:', authHeader); 
  const token = authHeader.split(' ')[1];
  if (token === process.env.ADMIN_TOKEN) {
    next();
  } else {
    res.status(403).json({       
      status : false,
      message: "Accès refusé. "});
  }
}

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const {
      nom = '',
      prenom = '',
      adresse = '',
      quartier = '',
      Sexe = '',
      profession = '',
      telephone = ''
    } = req.body;

    const trimmed = {
      nom: nom.trim(),
      prenom: prenom.trim(),
      adresse: adresse.trim(),
      quartier: quartier.trim(),
      Sexe: Sexe.trim(),
      profession: profession.trim(),
      telephone: telephone.trim()
    };

    // Validation manuelle du téléphone avant même de passer à Mongoose
    if (!/^01\d{8}$/.test(trimmed.telephone)) {
      return res.status(400).json({
        status: false,
        message: "Le numéro doit commencer par 01 et contenir exactement 10 chiffres."
      });
    }

    // Vérifie les champs essentiels
    if (!trimmed.nom || !trimmed.prenom || !trimmed.telephone || !trimmed.adresse) {
      return res.status(400).json({
        status: false,
        message: "Nom, prénom, adresse et téléphone sont requis."
      });
    }

    const newContact = new Contact(trimmed);
    await newContact.save();

    return res.status(201).json({
      status: true,
      message: "Contact enregistré avec succès."
    });

  } catch (err) {
    // Gestion des erreurs MongoDB
    if (err.code === 11000) {
      return res.status(409).json({
        status: false,
        message: "Ce contact existe déjà !"
      });
    }

    console.error("Erreur lors de l'enregistrement :", err);
    return res.status(500).json({
      status: false,
      message: "Erreur serveur. Réessayez plus tard."
    });
  }
};

export const deleteContact = async (req, res) => {
  const { telephone } = req.body;
  if (!telephone) return res.status(400).json({ error: "Téléphone requis" });

  try {
    const result = await Contact.deleteOne({ telephone });
    if (result.deletedCount === 0) return res.status(404).json({ error: "Contact non trouvé" });
    res.status(200).json({ message: "Contact supprimé" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
};
