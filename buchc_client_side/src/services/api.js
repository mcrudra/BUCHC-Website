import axios from 'axios';

// Get API URL - prioritize environment variable for separate deployments
const getApiBaseUrl = () => {
  // Use environment variable if set (for separate server deployment)
  if (import.meta.env.VITE_API_BASE_URL) {
    let url = import.meta.env.VITE_API_BASE_URL.trim();
    // Remove trailing slash
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    // Ensure /api is included
    if (!url.endsWith('/api')) {
      url = `${url}/api`;
    }
    console.log('API Base URL (from env):', url);
    return url;
  }
  
  // In production (Vercel), try to detect backend URL
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Production: use the backend URL (assuming it's buchc-website.vercel.app)
    const backendUrl = 'https://buchc-website.vercel.app/api';
    console.log('API Base URL (production fallback):', backendUrl);
    return backendUrl;
  }
  
  // Default to localhost for development
  const defaultUrl = 'http://localhost:8000/api';
  console.log('API Base URL (default):', defaultUrl);
  return defaultUrl;
};

const API_BASE_URL = getApiBaseUrl();
console.log('Final API Base URL:', API_BASE_URL);

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

