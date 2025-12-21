import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session cookies
});

// Auth
export const adminLogin = async (email, password) => {
  const formData = new URLSearchParams();
  formData.append('email', email);
  formData.append('password', password);
  
  const response = await adminApi.post('/admin/login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response;
};

export const adminLogout = async () => {
  return await adminApi.post('/admin/logout');
};

// Events
export const getEvents = async () => {
  return await adminApi.get('/admin/events');
};

export const createEvent = async (eventData) => {
  return await adminApi.post('/admin/events', eventData);
};

export const updateEvent = async (id, eventData) => {
  return await adminApi.put(`/admin/events/${id}`, eventData);
};

export const deleteEvent = async (id) => {
  return await adminApi.delete(`/admin/events/${id}`);
};

// Players
export const getPlayers = async () => {
  return await adminApi.get('/admin/players');
};

export const createPlayer = async (playerData) => {
  return await adminApi.post('/admin/players', playerData);
};

export const updatePlayer = async (id, playerData) => {
  return await adminApi.put(`/admin/players/${id}`, playerData);
};

export const deletePlayer = async (id) => {
  return await adminApi.delete(`/admin/players/${id}`);
};

// Team Members
export const getTeamMembers = async () => {
  return await adminApi.get('/admin/teams');
};

export const createTeamMember = async (memberData) => {
  return await adminApi.post('/admin/teams', memberData);
};

export const updateTeamMember = async (id, memberData) => {
  return await adminApi.put(`/admin/teams/${id}`, memberData);
};

export const deleteTeamMember = async (id) => {
  return await adminApi.delete(`/admin/teams/${id}`);
};

// Settings
export const getSettings = async () => {
  return await adminApi.get('/admin/settings');
};

export const updateSettings = async (settingsData) => {
  return await adminApi.post('/admin/settings', settingsData);
};

export default adminApi;

