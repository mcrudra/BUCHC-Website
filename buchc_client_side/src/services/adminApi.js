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
    console.log('Admin API Base URL (from env):', url);
    return url;
  }

  // In production (Vercel), try to detect backend URL
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    // Production: use the backend URL
    const backendUrl = 'https://buchc-website.vercel.app';
    console.log('Admin API Base URL (production fallback):', backendUrl);
    return backendUrl;
  }

  // Default to localhost for development
  const defaultUrl = 'http://localhost:8000';
  console.log('Admin API Base URL (default):', defaultUrl);
  return defaultUrl;
};

const API_BASE_URL = getApiBaseUrl();

// Log API base URL for debugging (remove in production)
console.log('Admin API Base URL:', API_BASE_URL);

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for session cookies
});

// Add request interceptor for debugging
adminApi.interceptors.request.use(
  (config) => {
    console.log('Admin API Request:', config.method?.toUpperCase(), config.url, config.baseURL);
    return config;
  },
  (error) => {
    console.error('Admin API Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
adminApi.interceptors.response.use(
  (response) => {
    console.log('Admin API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Admin API Response Error:', error.response?.status, error.response?.data, error.message);
    return Promise.reject(error);
  }
);

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
  try {
    // Add timeout to prevent hanging (3 seconds)
    const response = await adminApi.post('/admin/logout', {}, {
      timeout: 3000
    });
    return response;
  } catch (error) {
    // If timeout or network error, still consider it successful since we navigate immediately
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      console.warn('Logout request timed out, but user is already logged out');
      return { data: { success: true, message: 'Logged out (timeout)' } };
    }
    // For other errors, still return success since we don't want to block navigation
    console.warn('Logout request failed, but user is already logged out:', error.message);
    return { data: { success: true, message: 'Logged out' } };
  }
};

// Events
export const getEvents = async () => {
  return await adminApi.get('/admin/events');
};

export const createEvent = async (eventData) => {
  const formData = new FormData();
  
  // Append all fields to FormData
  Object.keys(eventData).forEach(key => {
    if (key === 'image' && eventData[key] instanceof File) {
      formData.append('image', eventData[key]);
    } else if (key !== 'image') {
      formData.append(key, eventData[key]);
    }
  });

  return await adminApi.post('/admin/events', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateEvent = async (id, eventData) => {
  const formData = new FormData();
  
  // Append all fields to FormData
  Object.keys(eventData).forEach(key => {
    if (key === 'image' && eventData[key] instanceof File) {
      formData.append('image', eventData[key]);
    } else if (key !== 'image') {
      formData.append(key, eventData[key]);
    }
  });

  return await adminApi.put(`/admin/events/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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
  const formData = new FormData();
  
  // Append all fields to FormData
  Object.keys(memberData).forEach(key => {
    if (key === 'photo' && memberData[key] instanceof File) {
      formData.append('photo', memberData[key]);
    } else if (key !== 'photo') {
      formData.append(key, memberData[key]);
    }
  });

  return await adminApi.post('/admin/teams', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const updateTeamMember = async (id, memberData) => {
  const formData = new FormData();
  
  // Append all fields to FormData
  Object.keys(memberData).forEach(key => {
    if (key === 'photo' && memberData[key] instanceof File) {
      formData.append('photo', memberData[key]);
    } else if (key !== 'photo') {
      formData.append(key, memberData[key]);
    }
  });

  return await adminApi.put(`/admin/teams/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
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

