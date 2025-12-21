import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/buchc';

const verifyAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check for admin user
    const adminEmail = 'club.buchc@g.bracu.ac.bd';
    const user = await User.findOne({ email: adminEmail });

    if (user) {
      console.log('\n✅ Admin user found:');
      console.log('   Email:', user.email);
      console.log('   Name:', user.name);
      console.log('   ID:', user._id);
      console.log('   Created:', user.createdAt);
      
      // Test password comparison
      const testPassword = 'adminbuchc123';
      const isMatch = await user.comparePassword(testPassword);
      console.log('\n🔐 Password test:');
      console.log('   Password matches:', isMatch ? '✅ YES' : '❌ NO');
      
      if (!isMatch) {
        console.log('\n⚠️  WARNING: Password does not match!');
        console.log('   You may need to reset the password or create a new admin user.');
      }
    } else {
      console.log('\n❌ Admin user NOT found!');
      console.log('   Email searched:', adminEmail);
      console.log('\n📝 To create the admin user, run:');
      console.log('   node scripts/createAdmin.js "BUCHC Admin" "club.buchc@g.bracu.ac.bd" "adminbuchc123"');
    }

    // List all users
    const allUsers = await User.find({});
    console.log('\n📊 All users in database:');
    if (allUsers.length === 0) {
      console.log('   No users found');
    } else {
      allUsers.forEach((u, index) => {
        console.log(`   ${index + 1}. ${u.email} (${u.name})`);
      });
    }

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

verifyAdmin();

