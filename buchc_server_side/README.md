# BUCHC Backend - MERN Stack

Node.js/Express backend with MongoDB for the BUCHC website.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Admin User
```bash
npm run create-admin
```

Default credentials:
- Email: `admin@buchc.com`
- Password: `admin123`

### 3. Start Server
```bash
npm run dev
```

Server runs on `http://localhost:8000`

## 📁 Project Structure

```
buchc_server_side/
├── controllers/
│   ├── admin/          # Admin panel controllers
│   └── api/            # API controllers
├── models/             # Mongoose models
├── routes/             # Express routes
├── middleware/         # Custom middleware
├── scripts/            # Utility scripts
└── server.js           # Main server file
```

## 🔌 API Endpoints

### Public API
- `GET /api/events` - Get all events (upcoming and past)
- `GET /api/events/:id` - Get single event
- `GET /api/players` - Get all players
- `GET /api/team-members` - Get all team members
- `GET /api/settings/join-link` - Get join link
- `GET /api/settings` - Get all settings

### Admin Routes (Requires Authentication)
- `GET /admin/dashboard` - Admin dashboard
- `GET /admin/events` - List events
- `POST /admin/events` - Create event
- `PUT /admin/events/:id` - Update event
- `DELETE /admin/events/:id` - Delete event
- `GET /admin/players` - List players
- `POST /admin/players` - Create player
- `PUT /admin/players/:id` - Update player
- `DELETE /admin/players/:id` - Delete player
- `GET /admin/teams` - List team members
- `POST /admin/teams` - Create team member
- `PUT /admin/teams/:id` - Update team member
- `DELETE /admin/teams/:id` - Delete team member
- `GET /admin/settings` - Get settings
- `POST /admin/settings` - Update settings

### Authentication
- `GET /buchcadmin` - Admin login page
- `POST /admin/login` - Login
- `POST /admin/logout` - Logout

## 🗄️ Database Models

### Event
- `title` (String, required)
- `desc` (String)
- `date` (Date, required)
- `time` (String)
- `location` (String)
- `img` (String)
- `is_past` (Boolean, default: false)
- `registration_link` (String)

### Player
- `rank` (Number, required, unique)
- `name` (String, required)
- `points` (Number, required)

### TeamMember
- `name` (String, required)
- `position` (String, required)
- `department` (String, required, enum: ['governing', 'em', 'creative', 'training', 'hr'])
- `photo` (String)
- `mail` (String)

### Setting
- `key` (String, required, unique)
- `value` (String)

### User
- `name` (String, required)
- `email` (String, required, unique)
- `password` (String, required, hashed)

## 🔐 Authentication

The admin panel uses session-based authentication. Sessions are stored in MongoDB using `connect-mongo`.

## 🛠️ Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run create-admin` - Create an admin user

## 📝 Environment Variables

Create a `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/BUCHCDB
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
SESSION_SECRET=your-super-secret-key-change-this-in-production
```

## ⚠️ Important Notes

- Change `SESSION_SECRET` in production
- Use strong passwords for database
- Change default admin credentials immediately
- Set `APP_DEBUG=false` in production
