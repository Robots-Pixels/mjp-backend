import express from 'express';
import { getAllContacts, createContact, deleteContact, addArrivant, addConverti, removeArrivant, removeConverti, listArrivants, listConvertis } from '../controllers/contact.controller.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';

const router = express.Router();

//Genral
router.get('/', verifyAdminToken,  getAllContacts);
router.post('/save', createContact);
router.delete('/delete', verifyAdminToken, deleteContact)

// Convertis
router.post("/convertis/add", verifyAdminToken, addConverti);
router.get("/convertis", verifyAdminToken, listConvertis);
router.delete("/convertis", verifyAdminToken, removeConverti);

// Arrivants
router.post("/arrivants/add", verifyAdminToken, addArrivant);
router.get("/arrivants", verifyAdminToken, listArrivants);
router.delete("/arrivants", verifyAdminToken, removeArrivant);

export default router;
