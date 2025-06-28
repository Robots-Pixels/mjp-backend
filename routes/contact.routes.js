import express from 'express';
import { getAllContacts, createContact, checkAuth, deleteContact } from '../controllers/contact.controller.js';
import { verifyAdminToken } from '../middlewares/verifyAdminToken.js';

const router = express.Router();

router.get('/', verifyAdminToken,  getAllContacts);
router.post('/save', createContact);
router.delete('/delete', verifyAdminToken, deleteContact)

export default router;
