# BUCHC Website
**Official Website of BRAC University Chess Club**

A modern, full-stack web application showcasing the BRAC University Chess Club's activities, events, team members, and player rankings.

**Live Site:** [https://clubbuchc.vercel.app/](https://clubbuchc.vercel.app/)

---

## ✨ Features

### 🏠 **Homepage**
- **Hero Section** - Engaging landing section with call-to-action
- **Upcoming Events** - Display of upcoming chess events and tournaments
- **Our Team** - Showcase of governing body and departmental directors
- **Top Players** - Leaderboard of top 10 ranked players
- **Events Gallery** - Comprehensive events section with past and upcoming events
- **Contact Information** - Club email, location, and social media links

### 🎯 **Dynamic Content Management**
- **Events Management** - Admin can add, edit, and manage events
  - Event registration links (optional)
  - Event modal popups with full details
  - Past and upcoming events separation
- **Top Players Leaderboard** - Admin can manage player rankings
  - Rank-based sorting
  - Points tracking
- **Team Members** - Complete team structure management
  - Governing Body (President, VP, Secretary, etc.)
  - General Co-ordinator
  - Departmental Directors (Event Management, Creative & IT, Training & Research, HR)
  - Position-based hierarchy and sorting

### ⚙️ **Admin Dashboard**
- **Secure Admin Panel** - Protected admin area at `/buchcadmin`
- **Modern React-based Dashboard** - Built with React and Tailwind CSS
- **Sidebar Navigation** - Collapsible sidebar with intuitive navigation
- **Content Management**:
  - Events CRUD operations
  - Players management
  - Team members management
- **Settings Panel**:
  - Join BUCHC link configuration
  - Club email management
  - Social media links (Facebook, Instagram, LinkedIn)
- **Dynamic Position Dropdowns** - Context-aware position selection based on department

### 🎨 **User Experience**
- **Smooth Navigation** - Scroll-to-section navigation for all menu items
- **Responsive Design** - Mobile-first, fully responsive layout
- **Interactive Elements**:
  - Event cards with modal popups
  - Clickable social media icons (when links provided)
  - Dynamic Join buttons (functional when link provided)
- **Modern UI** - Clean, professional design with Tailwind CSS

---

## 🛠️ Tech Stack

### **Frontend**
- **React 19** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

### **Backend**
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (MongoDB Atlas)
- **Mongoose** - MongoDB object modeling
- **Express Session** - Session management
- **Connect-Mongo** - MongoDB session store

### **Deployment**
- **Vercel** - Full-stack deployment platform
  - Frontend: Static site hosting
  - Backend: Serverless functions
- **MongoDB Atlas** - Cloud database hosting

### **Architecture**
- **MERN Stack** - MongoDB, Express, React, Node.js
- **RESTful API** - Clean API endpoints for data fetching
- **SPA Architecture** - Single Page Application with React
- **Serverless Functions** - Backend deployed as Vercel serverless functions
- **Separation of Concerns** - Frontend and backend completely separated

---

## 📁 Project Structure

```
BUCHC-Website/
├── buchc_client_side/          # React Frontend
│   ├── src/
│   │   ├── components/         # React components
│   │   │   ├── Events.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── OurTeam.jsx
│   │   │   ├── TopPlayer.jsx
│   │   │   ├── admin/          # Admin dashboard components
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── AdminDashboard.jsx
│   │   │   │   ├── AdminLayout.jsx
│   │   │   │   ├── EventsManagement.jsx
│   │   │   │   ├── PlayersManagement.jsx
│   │   │   │   ├── TeamMembersManagement.jsx
│   │   │   │   └── SettingsManagement.jsx
│   │   │   └── UpcomingEvents.jsx
│   │   ├── services/            # API service layer
│   │   │   ├── api.js          # Public API client
│   │   │   └── adminApi.js     # Admin API client
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── package.json
│
├── buchc_server_side/          # Node.js/Express Backend
│   ├── controllers/
│   │   ├── admin/              # Admin panel controllers
│   │   ├── api/                # API controllers
│   │   └── authController.js   # Authentication controller
│   ├── models/                 # Mongoose models
│   │   ├── Event.js
│   │   ├── Player.js
│   │   ├── TeamMember.js
│   │   ├── Setting.js
│   │   └── User.js
│   ├── routes/
│   │   ├── admin.js            # Admin routes
│   │   ├── api.js              # API routes
│   │   └── auth.js             # Auth routes
│   ├── middleware/
│   │   └── auth.js             # Authentication middleware
│   ├── scripts/
│   │   └── createAdmin.js      # Admin user creation script
│   └── server.js               # Express server entry point
│
├── api/                        # Vercel serverless functions
│   ├── index.js               # Serverless function wrapper
│   └── package.json
│
├── vercel.json                 # Vercel deployment configuration
└── package.json               # Root package.json
```

---

## 🎯 Key Features Breakdown

### **Events System**
- ✅ Create, read, update, delete events
- ✅ Event registration links (optional)
- ✅ Image support for events
- ✅ Past/upcoming event categorization
- ✅ Interactive event modals

### **Player Management**
- ✅ Top 10 players leaderboard
- ✅ Rank-based sorting
- ✅ Points tracking
- ✅ Admin-managed rankings

### **Team Structure**
- ✅ Governing Body with position hierarchy
- ✅ General Co-ordinator section
- ✅ Departmental Directors (4 departments)
- ✅ Automatic position-based sorting
- ✅ Dynamic position dropdowns in admin

### **Settings System**
- ✅ Join BUCHC link management
- ✅ Club email configuration
- ✅ Social media links (Facebook, Instagram, LinkedIn)
- ✅ All settings manageable from admin panel

### **Navigation**
- ✅ Smooth scroll navigation
- ✅ Mobile-responsive menu
- ✅ Section-based routing

---

## 📸 Sections

1. **Hero** - Welcome section with club introduction
2. **Upcoming Events** - Quick view of next events
3. **Our Team** - Complete team structure
4. **Top Players** - Leaderboard rankings
5. **Events** - Full events gallery with modals
6. **Contact** - Footer with contact information

---

## 🔐 Admin Access

- **Admin Login**: `/buchcadmin` or `/admin/login`
- Secure session-based authentication
- React-based admin dashboard with sidebar navigation
- Full CRUD operations for all content types

---

## 📝 License

© 2025 BRAC University Chess Club (BUCHC). All rights reserved.
