import express from 'express';
import {
  getEvents,
  getEventById
} from '../controllers/api/eventController.js';
import {
  getPlayers
} from '../controllers/api/playerController.js';
import {
  getTeamMembers
} from '../controllers/api/teamMemberController.js';
import {
  getJoinLink,
  getAllSettings
} from '../controllers/api/settingController.js';

const router = express.Router();

// Events routes
router.get('/events', getEvents);
router.get('/events/:id', getEventById);

// Players routes
router.get('/players', getPlayers);

// Team members routes
router.get('/team-members', getTeamMembers);

// Settings routes
router.get('/settings/join-link', getJoinLink);
router.get('/settings', getAllSettings);

export default router;
