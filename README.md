# BUCHC Website
**Official Website of BRAC University Chess Club**

A modern, full-stack web application showcasing the BRAC University Chess Club's activities, events, team members, and player rankings.

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
- **Laravel 12** - PHP framework
- **SQLite** - Database (can be switched to PostgreSQL/MySQL)
- **Laravel Sanctum** - API authentication
- **Blade Templates** - Server-side templating for admin panel

### **Architecture**
- **RESTful API** - Clean API endpoints for data fetching
- **SPA Architecture** - Single Page Application with React
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
│   │   │   └── UpcomingEvents.jsx
│   │   ├── services/          # API service layer
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── Navbar.jsx
│   │   └── Footer.jsx
│   └── package.json
│
└── buchc_server_side/          # Laravel Backend
    ├── app/
    │   ├── Http/Controllers/
    │   │   ├── Admin/         # Admin panel controllers
    │   │   └── Api/           # API controllers
    │   └── Models/            # Eloquent models
    ├── database/
    │   ├── migrations/        # Database migrations
    │   └── seeders/           # Database seeders
    ├── resources/views/
    │   └── admin/             # Admin panel views
    └── routes/
        ├── api.php            # API routes
        └── web.php            # Web routes
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

- Secure admin authentication system
- Content management dashboard

---

## 📝 License

© 2025 BRAC University Chess Club (BUCHC). All rights reserved.