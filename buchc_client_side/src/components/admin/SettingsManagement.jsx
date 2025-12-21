import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getSettings, updateSettings } from '../../services/adminApi';

export default function SettingsManagement() {
  const [formData, setFormData] = useState({
    join_link: '',
    club_email: '',
    facebook_link: '',
    instagram_link: '',
    linkedin_link: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();
      setFormData(response.data);
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
    setSaving(true);
    try {
      await updateSettings(formData);
      alert('Settings saved successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving settings');
    } finally {
      setSaving(false);
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
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Settings</h1>
          <p className="text-gray-600 mt-1">Manage Join BUCHC link and social media links</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Join BUCHC Link</label>
              <input
                type="url"
                value={formData.join_link}
                onChange={(e) => setFormData({ ...formData, join_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Link for "Join BUCHC" buttons. Leave empty to disable buttons.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Club Email</label>
              <input
                type="email"
                value={formData.club_email}
                onChange={(e) => setFormData({ ...formData, club_email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="club@buchc.com"
              />
              <p className="text-xs text-gray-500 mt-1">
                Contact email displayed in footer.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Facebook Page Link</label>
              <input
                type="url"
                value={formData.facebook_link}
                onChange={(e) => setFormData({ ...formData, facebook_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://facebook.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to hide Facebook icon.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Instagram Page Link</label>
              <input
                type="url"
                value={formData.instagram_link}
                onChange={(e) => setFormData({ ...formData, instagram_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://instagram.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to hide Instagram icon.
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">LinkedIn Page Link</label>
              <input
                type="url"
                value={formData.linkedin_link}
                onChange={(e) => setFormData({ ...formData, linkedin_link: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="https://linkedin.com/..."
              />
              <p className="text-xs text-gray-500 mt-1">
                Leave empty to hide LinkedIn icon.
              </p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Settings'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}

