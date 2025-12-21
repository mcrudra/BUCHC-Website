import express from 'express';
import { showLogin, login, logout } from '../controllers/authController.js';

const router = express.Router();

// Show login page
router.get('/', showLogin);
router.get('/buchcadmin', showLogin);

// Login - handle both JSON and form data
router.post('/admin/login', login);

// Logout
router.post('/admin/logout', logout);

export default router;
