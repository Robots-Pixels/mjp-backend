import express from 'express';
import { login, adminSignUp } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', login);
router.post('/adminSignUp', adminSignUp);

export default router;
