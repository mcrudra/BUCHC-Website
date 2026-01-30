import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import AdminLogin from './components/admin/AdminLogin.jsx'
import AdminDashboard from './components/admin/AdminDashboard.jsx'
import EventsManagement from './components/admin/EventsManagement.jsx'
import PlayersManagement from './components/admin/PlayersManagement.jsx'
import TeamMembersManagement from './components/admin/TeamMembersManagement.jsx'
import SettingsManagement from './components/admin/SettingsManagement.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/buchcadmin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventsManagement />} />
        <Route path="/admin/players" element={<PlayersManagement />} />
        <Route path="/admin/teams" element={<TeamMembersManagement />} />
        <Route path="/admin/settings" element={<SettingsManagement />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
