import axios from 'axios';

// Get API URL - prioritize environment variable for separate deployments
const getApiBaseUrl = () => {
  // Use environment variable if set (for separate server deployment)
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  // Default to localhost for development
  return 'http://localhost:8000/api';
};

const API_BASE_URL = getApiBaseUrl();

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export const fetchEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    return { upcomingEvents: [], pastEvents: [] };
  }
};

export const fetchPlayers = async () => {
  try {
    const response = await api.get('/players');
    return response.data;
  } catch (error) {
    console.error('Error fetching players:', error);
    return [];
  }
};

export const fetchTeamMembers = async () => {
  try {
    const response = await api.get('/team-members');
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    return { governing: [], em: [], creative: [], training: [], hr: [] };
  }
};

export const fetchJoinLink = async () => {
  try {
    const response = await api.get('/settings/join-link');
    return response.data.join_link || '';
  } catch (error) {
    console.error('Error fetching join link:', error);
    return '';
  }
};

export const fetchAllSettings = async () => {
  try {
    const response = await api.get('/settings');
    return response.data;
  } catch (error) {
    console.error('Error fetching settings:', error);
    return {
      join_link: '',
      club_email: '',
      facebook_link: '',
      instagram_link: '',
      linkedin_link: '',
    };
  }
};

export default api;

