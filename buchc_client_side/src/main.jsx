import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AdminLogin from "./components/admin/AdminLogin.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import EventsManagement from "./components/admin/EventsManagement.jsx";
import PlayersManagement from "./components/admin/PlayersManagement.jsx";
import TeamMembersManagement from "./components/admin/TeamMembersManagement.jsx";
import RegistrationManagement from "./components/admin/RegistrationManagement.jsx";
import RegistrationsListManagement from "./components/admin/RegistrationsListManagement.jsx";
import SettingsManagement from "./components/admin/SettingsManagement.jsx";
import RegistrationPage from "./components/RegistrationPage.jsx";
import RegistrationSuccess from "./components/RegistrationSuccess.jsx";
import GalleryPage from "./components/Gallery.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/buchcadmin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<EventsManagement />} />
        <Route path="/admin/players" element={<PlayersManagement />} />
        <Route path="/admin/teams" element={<TeamMembersManagement />} />
        <Route
          path="/admin/registration"
          element={<RegistrationManagement />}
        />
        <Route
          path="/admin/registrations"
          element={<RegistrationsListManagement />}
        />
        <Route path="/admin/settings" element={<SettingsManagement />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
        <Route path="/galary" element={<GalleryPage />} />
        <Route path="/*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
