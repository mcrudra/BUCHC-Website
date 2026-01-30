import mongoose from 'mongoose';
import User from '../models/User.js';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buchc';

const createAdminProduction = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const email = 'club.buchc@g.bracu.ac.bd';
    const password = 'adminbuchc123';
    const name = 'BUCHC Admin';

    console.log(`\nCreating admin user:`);
    console.log(`  Name: ${name}`);
    console.log(`  Email: ${email}`);
    console.log(`  Password: ${password}\n`);

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase().trim() });
    if (existingUser) {
      console.log('⚠️  User with this email already exists');
      console.log('   Email:', existingUser.email);
      console.log('   Name:', existingUser.name);
      console.log('   ID:', existingUser._id);
      
      // Option to update password
      console.log('\nTo update the password, delete the user first or use a different email.');
      process.exit(0);
    }

    // Create admin user
    const user = await User.create({
      name,
      email: email.toLowerCase().trim(),
      password // Will be hashed by pre-save hook
    });

    console.log('✅ Admin user created successfully!');
    console.log(`   Name: ${user.name}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   ID: ${user._id}`);
    console.log(`\n⚠️  IMPORTANT: Change the default password after first login!`);

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    console.error(error);
    process.exit(1);
  }
};

createAdminProduction();

