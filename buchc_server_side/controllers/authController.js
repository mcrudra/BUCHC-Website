import User from '../models/User.js';
import { body, validationResult } from 'express-validator';

export const showLogin = (req, res) => {
  // Frontend handles login UI, just return JSON
  res.json({ message: 'Login page - handled by frontend' });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Login attempt:', { 
      rawEmail: email, 
      normalizedEmail: email?.toLowerCase().trim(), 
      hasPassword: !!password 
    });
    
    if (!email || !password) {
      console.log('Missing email or password');
      return res.status(400).json({ message: 'Email and password are required' });
    }
    
    const normalizedEmail = email.toLowerCase().trim();
    
    // Try to find user with normalized email
    let user = await User.findOne({ email: normalizedEmail });
    
    // If not found, try case-insensitive search
    if (!user) {
      user = await User.findOne({ 
        email: { $regex: new RegExp(`^${normalizedEmail}$`, 'i') }
      });
    }
    
    // List all users for debugging (remove in production)
    const allUsers = await User.find({}).select('email name');
    console.log('All users in database:', allUsers.map(u => ({ email: u.email, name: u.name })));
    console.log('User lookup:', { 
      searchedEmail: normalizedEmail, 
      found: !!user,
      userEmail: user?.email 
    });
    
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
    console.log('Session ID:', req.sessionID);
    
    // Save session before responding
    req.session.save((err) => {
      if (err) {
        console.error('Session save error:', err);
        return res.status(500).json({ message: 'Session error', error: err.message });
      }
      
      console.log('Session saved successfully');
      console.log('Cookie will be set:', {
        name: 'buchc.session',
        secure: process.env.NODE_ENV === 'production' || process.env.VERCEL,
        sameSite: (process.env.NODE_ENV === 'production' || process.env.VERCEL) ? 'none' : 'lax',
        httpOnly: true
      });
      
      // Explicitly set cookie headers for debugging
      const cookieOptions = {
        secure: process.env.NODE_ENV === 'production' || process.env.VERCEL,
        httpOnly: true,
        sameSite: (process.env.NODE_ENV === 'production' || process.env.VERCEL) ? 'none' : 'lax',
        maxAge: 14 * 24 * 60 * 60 * 1000
      };
      
      return res.json({ 
        success: true, 
        message: 'Login successful',
        sessionId: req.sessionID
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
};

export const logout = (req, res) => {
  // Clear the session cookie immediately
  res.clearCookie('buchc.session', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' || process.env.VERCEL,
    sameSite: (process.env.NODE_ENV === 'production' || process.env.VERCEL) ? 'none' : 'lax',
    path: '/'
  });

  // Return success immediately (don't wait for session destruction)
  // Session destruction will happen in background
  res.json({ success: true, message: 'Logged out successfully' });

  // Destroy session in background (non-blocking)
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error (non-critical):', err);
      // Don't send error to client since we already responded
    }
  });
};
