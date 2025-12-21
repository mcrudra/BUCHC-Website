import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

export const showLogin = (req, res) => {
  // Frontend handles login UI, just return JSON
  res.json({ message: 'Login page - handled by frontend' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { email: email?.toLowerCase().trim(), hasPassword: !!password });
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });
    
    console.log('User lookup:', { email: normalizedEmail, found: !!user });
    
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await user.comparePassword(password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Set session
    req.session.userId = user._id.toString();
    req.session.userEmail = user.email;
    
    console.log('Session set:', { userId: req.session.userId, userEmail: req.session.userEmail });
    
    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: 'Session error', error: err.message });
      }
      
      console.log('Session saved successfully');
      return res.json({ success: true, message: 'Login successful' });
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
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
