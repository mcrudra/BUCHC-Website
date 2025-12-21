# Migration Guide: Laravel to MERN Stack

This guide explains the changes made when converting from Laravel (PHP) to MERN (MongoDB, Express, React, Node.js).

## 🔄 What Changed

### Backend Technology
- **Before**: Laravel (PHP) with SQLite/PostgreSQL
- **After**: Node.js/Express with MongoDB

### Database
- **Before**: SQL database (SQLite/PostgreSQL) with Eloquent ORM
- **After**: MongoDB with Mongoose ODM

### Authentication
- **Before**: Laravel sessions
- **After**: Express sessions with MongoDB storage

## 📁 File Structure Changes

### Removed (Laravel-specific)
- `composer.json` → Replaced with `package.json`
- `artisan` → Replaced with npm scripts
- `app/Http/Controllers/` → Converted to `controllers/`
- `app/Models/` → Converted to `models/` (Mongoose schemas)
- `routes/api.php` → Converted to `routes/api.js`
- `routes/web.php` → Converted to `routes/admin.js` and `routes/auth.js`
- `database/migrations/` → No longer needed (MongoDB is schema-less)
- `resources/views/` → Admin views converted to simple HTML responses (can be upgraded to React later)

### Added (Node.js/Express)
- `server.js` - Main Express server
- `package.json` - Node.js dependencies
- `models/` - Mongoose schemas
- `controllers/api/` - API controllers
- `controllers/admin/` - Admin controllers
- `routes/api.js` - API routes
- `routes/admin.js` - Admin routes
- `routes/auth.js` - Authentication routes
- `middleware/auth.js` - Authentication middleware
- `scripts/createAdmin.js` - Admin user creation script

## 🔌 API Endpoints (Unchanged)

The API endpoints remain the same, so the frontend doesn't need changes:

- `GET /api/events`
- `GET /api/events/:id`
- `GET /api/players`
- `GET /api/team-members`
- `GET /api/settings/join-link`
- `GET /api/settings`

## 🗄️ Database Schema Changes

### Events Collection
```javascript
{
  title: String (required),
  desc: String,
  date: Date (required),
  time: String,
  location: String,
  img: String,
  is_past: Boolean (default: false),
  registration_link: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Players Collection
```javascript
{
  rank: Number (required, unique),
  name: String (required),
  points: Number (required),
  createdAt: Date,
  updatedAt: Date
}
```

### TeamMembers Collection
```javascript
{
  name: String (required),
  position: String (required),
  department: String (required, enum: ['governing', 'em', 'creative', 'training', 'hr']),
  photo: String,
  mail: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Settings Collection
```javascript
{
  key: String (required, unique),
  value: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Users Collection
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Setup Instructions

### 1. Install Dependencies
```bash
cd buchc_server_side
npm install
```

### 2. Configure Environment
Create a `.env` file:
```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
MONGODB_URI=mongodb://localhost:27017/buchc
SESSION_SECRET=your-super-secret-key-change-this-in-production
```

### 3. Start MongoDB
- **Local**: Make sure MongoDB is running locally
- **Atlas**: Use your MongoDB Atlas connection string in `MONGODB_URI`

### 4. Create Admin User
```bash
npm run create-admin
```

### 5. Start Server
```bash
npm run dev
```

## 📝 Data Migration

If you have existing data in Laravel, you'll need to export it and import into MongoDB. Here's a general approach:

1. Export data from Laravel (using Laravel's export features or direct database dump)
2. Convert SQL data to JSON format
3. Import into MongoDB using `mongoimport` or a migration script

Example migration script structure:
```javascript
// scripts/migrateData.js
import mongoose from 'mongoose';
import Event from '../models/Event.js';
// ... import other models

// Connect to MongoDB
// Read exported data
// Transform and insert into MongoDB collections
```

## ⚠️ Important Notes

1. **No More Migrations**: MongoDB is schema-less, so you don't need migration files. Schema validation is handled in Mongoose models.

2. **Admin Panel**: The admin panel currently uses simple HTML responses. You can upgrade it to a full React admin dashboard later.

3. **File Uploads**: File upload handling (for images) needs to be implemented using `multer` middleware if needed.

4. **CORS**: CORS is configured to allow requests from the frontend URL specified in `.env`.

5. **Sessions**: Sessions are stored in MongoDB using `connect-mongo`, so they persist across server restarts.

## 🔐 Security Considerations

- Change `SESSION_SECRET` in production
- Use strong MongoDB passwords
- Enable MongoDB authentication
- Use HTTPS in production
- Validate all inputs (already implemented with express-validator)

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Check if MongoDB is running
- Verify connection string format
- Check network/firewall settings for MongoDB Atlas

### Session Issues
- Clear browser cookies
- Check session store connection
- Verify SESSION_SECRET is set

### CORS Errors
- Verify FRONTEND_URL in `.env` matches your frontend URL
- Check CORS configuration in `server.js`

