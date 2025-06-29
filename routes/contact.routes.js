import express from 'express';
import { getAllContacts, createContact, checkAuth, deleteContact } from '../controllers/contact.controller.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';

const router = express.Router();

//Genral

router.get('/', verifyAdminToken,  getAllContacts);
router.post('/save', createContact);
router.delete('/delete', verifyAdminToken, deleteContact)

// Convertis
router.post("/convertis/add", verifyAdmin, addConverti);
router.get("/convertis", verifyAdmin, listConvertis);
router.delete("/convertis", verifyAdmin, removeConverti);

// Arrivants
router.post("/arrivants/add", verifyAdmin, addArrivant);
router.get("/arrivants", verifyAdmin, listArrivants);
router.delete("/arrivants", verifyAdmin, removeArrivant);



export default router;
