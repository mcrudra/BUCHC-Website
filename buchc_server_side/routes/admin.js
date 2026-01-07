import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';
import { logout } from '../controllers/authController.js';
import { getDashboard } from '../controllers/admin/dashboardController.js';
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent
} from '../controllers/admin/eventController.js';
import {
  getPlayers,
  createPlayer,
  updatePlayer,
  deletePlayer,
  getPlayer
} from '../controllers/admin/playerController.js';
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getTeamMember
} from '../controllers/admin/teamController.js';
import {
  getSettings,
  updateSettings
} from '../controllers/admin/settingController.js';
import { uploadImage } from '../controllers/admin/uploadController.js';
import { uploadSingle } from '../middleware/upload.js';

const router = express.Router();

// All admin routes require authentication (except login which is handled in auth routes)
router.use(isAuthenticated);

// Logout
router.post('/logout', logout);

// Dashboard
router.get('/dashboard', getDashboard);

// Events
router.get('/events', getEvents);
router.get('/events/create', (req, res) => {
  req.params = { id: 'new' };
  return getEvent(req, res);
});
router.get('/events/:id', getEvent);
router.post('/events', uploadSingle('image'), createEvent);
router.put('/events/:id', uploadSingle('image'), updateEvent);
router.delete('/events/:id', deleteEvent);

// Players
router.get('/players', getPlayers);
router.get('/players/create', (req, res) => {
  req.params = { id: 'new' };
  return getPlayer(req, res);
});
router.get('/players/:id', getPlayer);
router.post('/players', createPlayer);
router.put('/players/:id', updatePlayer);
router.delete('/players/:id', deletePlayer);

// Team Members
router.get('/teams', getTeamMembers);
router.get('/teams/create', (req, res) => {
  req.params = { id: 'new' };
  return getTeamMember(req, res);
});
router.get('/teams/:id', getTeamMember);
router.post('/teams', uploadSingle('photo'), createTeamMember);
router.put('/teams/:id', uploadSingle('photo'), updateTeamMember);
router.delete('/teams/:id', deleteTeamMember);

// Settings
router.get('/settings', getSettings);
router.post('/settings', updateSettings);

// Image Upload
router.post('/upload/image', uploadSingle('image'), uploadImage);

export default router;
