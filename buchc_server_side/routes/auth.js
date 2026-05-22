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
    // Create admin user
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password
    });

    res.json({ 
      message: 'Admin user created successfully',
      email: user.email,
      name: user.name
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'Error creating admin', error: error.message });
  }
});

export default router;
