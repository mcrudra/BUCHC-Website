import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getEvents, getPlayers, getTeamMembers } from '../../services/adminApi';
import { Calendar, Users, UserCog, Settings } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ events: 0, players: 0, teams: 0 });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [eventsRes, playersRes, teamsRes] = await Promise.all([
        getEvents(),
        getPlayers(),
        getTeamMembers(),
      ]);
      setStats({
        events: eventsRes.data.length,
        players: playersRes.data.length,
        teams: teamsRes.data.length,
      });
    } catch (err) {
      console.error('Error loading stats:', err);
      // Only redirect on 401 (unauthorized), not on other errors
      if (err.response?.status === 401) {
        console.log('Unauthorized, redirecting to login');
        navigate('/admin/login');
      } else {
        // For other errors (404, network, etc.), just show empty stats
        console.warn('Failed to load stats, showing empty dashboard');
        setStats({ events: 0, players: 0, teams: 0 });
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-xl text-gray-600">Loading...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome to BUCHC Admin Panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Calendar className="text-purple-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Events</h3>
            <div className="text-3xl font-bold text-gray-800">{stats.events}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Top Players</h3>
            <div className="text-3xl font-bold text-gray-800">{stats.players}</div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCog className="text-green-600" size={24} />
              </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">Team Members</h3>
            <div className="text-3xl font-bold text-gray-800">{stats.teams}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={() => navigate('/admin/events')}
              className="bg-purple-600 text-white p-4 rounded-lg hover:bg-purple-700 transition-colors text-center"
            >
              <Calendar className="mx-auto mb-2" size={24} />
              <div className="font-medium">Manage Events</div>
            </button>
            <button
              onClick={() => navigate('/admin/players')}
              className="bg-blue-600 text-white p-4 rounded-lg hover:bg-blue-700 transition-colors text-center"
            >
              <Users className="mx-auto mb-2" size={24} />
              <div className="font-medium">Manage Players</div>
            </button>
            <button
              onClick={() => navigate('/admin/teams')}
              className="bg-green-600 text-white p-4 rounded-lg hover:bg-green-700 transition-colors text-center"
            >
              <UserCog className="mx-auto mb-2" size={24} />
              <div className="font-medium">Manage Team</div>
            </button>
            <button
              onClick={() => navigate('/admin/settings')}
              className="bg-gray-600 text-white p-4 rounded-lg hover:bg-gray-700 transition-colors text-center"
            >
              <Settings className="mx-auto mb-2" size={24} />
              <div className="font-medium">Settings</div>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
