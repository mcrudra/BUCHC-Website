import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getPlayers, createPlayer, updatePlayer, deletePlayer } from '../../services/adminApi';

export default function PlayersManagement() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPlayer, setEditingPlayer] = useState(null);
  const [formData, setFormData] = useState({
    rank: '',
    name: '',
    points: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    loadPlayers();
  }, []);

  const loadPlayers = async () => {
    try {
      const response = await getPlayers();
      setPlayers(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        rank: parseInt(formData.rank),
        name: formData.name,
        points: parseInt(formData.points),
      };
      if (editingPlayer) {
        await updatePlayer(editingPlayer._id, data);
      } else {
        await createPlayer(data);
      }
      setShowForm(false);
      setEditingPlayer(null);
      setFormData({ rank: '', name: '', points: '' });
      loadPlayers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving player');
    }
  };

  const handleEdit = (player) => {
    setEditingPlayer(player);
    setFormData({
      rank: player.rank,
      name: player.name,
      points: player.points,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this player?')) return;
    try {
      await deletePlayer(id);
      loadPlayers();
    } catch (err) {
      alert('Error deleting player');
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center">Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Top Players</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Create, update, and delete top players</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingPlayer(null);
              setFormData({ rank: '', name: '', points: '' });
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Player
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {editingPlayer ? 'Edit Player' : 'Create Player'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Rank *</label>
                <input
                  type="number"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  min="1"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Points *</label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({ ...formData, points: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                  min="0"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  {editingPlayer ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingPlayer(null);
                  }}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rank</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Points</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {players.map((player) => (
                  <tr key={player._id}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{player.rank}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{player.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{player.points}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(player)}
                          className="text-purple-600 hover:text-purple-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(player._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {players.length === 0 && (
            <div className="text-center py-8 text-gray-500">No players found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

