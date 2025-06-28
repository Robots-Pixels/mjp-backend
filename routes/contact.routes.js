import express from 'express';
import { getAllContacts, createContact, checkAuth, deleteContact } from '../controllers/contact.controller.js';

const router = express.Router();

router.get('/', checkAuth,  getAllContacts);
router.post('/save', createContact);
router.delete('/delete', deleteContact)

export default router;
