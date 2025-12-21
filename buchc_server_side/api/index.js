// Vercel serverless function wrapper for Express app
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import MongoStore from 'connect-mongo';

// Import routes - paths relative to api/index.js location
// api/index.js is in buchc_server_side/api/, routes are in buchc_server_side/routes/
import apiRoutes from '../routes/api.js';
import adminRoutes from '../routes/admin.js';
import authRoutes from '../routes/auth.js';

// Load environment variables
dotenv.config();

// Log environment variables for debugging (remove sensitive data in production)
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: !!process.env.VERCEL,
  FRONTEND_URL: process.env.FRONTEND_URL,
  MONGODB_URI: process.env.MONGODB_URI ? '***set***' : 'not set',
  SESSION_SECRET: process.env.SESSION_SECRET ? '***set***' : 'not set'
});

const app = express();

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buchc';

// Connect to MongoDB (reuse connection if exists)
// For serverless, we need to handle connection pooling properly
let isConnecting = false;
const connectDB = async () => {
  // If already connected, return
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }
  
  // If already connecting, wait
  if (isConnecting) {
    return new Promise((resolve) => {
      const checkConnection = setInterval(() => {
        if (mongoose.connection.readyState === 1) {
          clearInterval(checkConnection);
          resolve(mongoose.connection);
        }
      }, 100);
    });
  }
  
  isConnecting = true;
  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
    });
    console.log('✅ Connected to MongoDB');
    isConnecting = false;
    return mongoose.connection;
  } catch (error) {
    isConnecting = false;
    console.error('❌ MongoDB connection error:', error);
    throw error;
  }
};

// Middleware - CORS configuration
const getFrontendUrl = () => {
  if (process.env.FRONTEND_URL) {
    return process.env.FRONTEND_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return 'http://localhost:5173';
};

const frontendUrl = getFrontendUrl();

// CORS - Allow frontend domain (including Vercel preview deployments)
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests from frontend domain or no origin (like Postman)
    const allowedOrigins = [
      frontendUrl,
      'https://clubbuchc.vercel.app',
      'http://localhost:5173'
    ];
    
    // Allow any Vercel preview deployment (clubbuchc-*.vercel.app)
    const isVercelPreview = origin && (
      origin.includes('clubbuchc') && 
      origin.includes('vercel.app')
    );
    
    console.log('CORS check:', { origin, frontendUrl, allowedOrigins, isVercelPreview });
    
    if (!origin || allowedOrigins.includes(origin) || isVercelPreview) {
      console.log('CORS allowed for origin:', origin);
      callback(null, true);
    } else {
      console.log('CORS blocked for origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: MONGODB_URI,
    ttl: 14 * 24 * 60 * 60 // 14 days
  }),
  cookie: {
    secure: isProduction, // HTTPS only in production
    httpOnly: true,
    sameSite: isProduction ? 'none' : 'lax', // Required for cross-origin cookies in production
    maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
    domain: isProduction ? undefined : undefined // Let browser handle domain
  },
  name: 'buchc.session' // Custom session name
}));

// Routes - Auth routes first (before admin routes)
app.use('/', authRoutes);
app.use('/api', apiRoutes);
app.use('/admin', adminRoutes);

// Health check (before DB connection check)
app.get('/up', async (req, res) => {
  try {
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    res.json({ 
      status: 'ok',
      database: dbStatus,
      env: {
        hasMongoUri: !!process.env.MONGODB_URI,
        hasSessionSecret: !!process.env.SESSION_SECRET,
        frontendUrl: frontendUrl
      }
    });
  } catch (error) {
    res.json({ 
      status: 'error',
      error: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Express error:', err.stack);
  res.status(500).json({
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found', path: req.path });
});

// Export as Vercel serverless function handler
export default async (req, res) => {
  try {
    // Ensure MongoDB connection before handling request
    if (mongoose.connection.readyState === 0) {
      await connectDB();
    }
    
    // Handle the request with Express app
    return app(req, res);
  } catch (error) {
    console.error('Handler error:', error);
    // Return error response instead of crashing
    return res.status(500).json({ 
      message: 'Server error',
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};
