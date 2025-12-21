import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

export const showLogin = (req, res) => {
  // Frontend handles login UI, just return JSON
  res.json({ message: 'Login page - handled by frontend' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      if (req.headers['content-type']?.includes('application/json') || 
          req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      return res.redirect('/buchcadmin?error=Email and password are required');
    }
    
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    
    if (!user) {
      if (req.headers['content-type']?.includes('application/json') || 
          req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.redirect('/buchcadmin?error=Invalid credentials');
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      if (req.headers['content-type']?.includes('application/json') || 
          req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      return res.redirect('/buchcadmin?error=Invalid credentials');
    }

    // Set session
    req.session.userId = user._id.toString();
    req.session.userEmail = user.email;
    
    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        if (req.headers['content-type']?.includes('application/json') || 
            req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
          return res.status(500).json({ message: 'Session error' });
        }
        return res.redirect('/buchcadmin?error=Session error');
      }
      
      // Check if it's an API request (from React)
      if (req.headers['content-type']?.includes('application/json') || 
          req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
        return res.json({ success: true, message: 'Login successful' });
      }
      
      // Otherwise redirect (for HTML form)
      res.redirect('/admin/dashboard');
    });
  } catch (error) {
    console.error('Login error:', error);
    if (req.headers['content-type']?.includes('application/json') || 
        req.headers['content-type']?.includes('application/x-www-form-urlencoded')) {
      return res.status(500).json({ message: 'Something went wrong' });
    }
    res.redirect('/buchcadmin?error=Something went wrong');
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.redirect('/buchcadmin');
  });
};
