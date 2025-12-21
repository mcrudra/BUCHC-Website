import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function createAdmin() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buchc';
    
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Default admin credentials (change these!)
    const name = process.argv[2] || 'Admin';
    const email = process.argv[3] || 'admin@buchc.com';
    const password = process.argv[4] || 'admin123';

    console.log(`\nCreating admin user:`);
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}\n`);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('⚠️  User with this email already exists');
      console.log('   You can login with the existing credentials');
      process.exit(0);
    }

    // Create admin user
    const user = await User.create({
      name,
      email,
      password // Will be hashed by pre-save hook
    });

    console.log('✅ Admin user created successfully!');
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`\n⚠️  IMPORTANT: Change the default password after first login!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    process.exit(1);
  }
}

createAdmin();
