import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../../services/adminApi';

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    desc: '',
    date: '',
    time: '',
    location: '',
    img: '',
    image: null, // File object
    registration_link: '',
    is_past: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
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
      // Prepare data - include image file if selected
      const submitData = { ...formData };
      if (submitData.image) {
        // If new image file is selected, use it and remove the old img URL
        delete submitData.img;
      } else {
        // If no new image file, remove the image field but keep img URL if it exists
        delete submitData.image;
        // Keep img URL in submitData if it exists (for updates without new image)
      }

      if (editingEvent) {
        await updateEvent(editingEvent._id, submitData);
      } else {
        await createEvent(submitData);
      }
      setShowForm(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        desc: '',
        date: '',
        time: '',
        location: '',
        img: '',
        image: null,
        registration_link: '',
        is_past: false,
      });
      setImagePreview(null);
      loadEvents();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving event');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, img: '' });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      desc: event.desc || '',
      date: event.date ? new Date(event.date).toISOString().split('T')[0] : '',
      time: event.time || '',
      location: event.location || '',
      img: event.img || '',
      image: null,
      registration_link: event.registration_link || '',
      is_past: event.is_past || false,
    });
    setImagePreview(event.img || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this event?')) return;
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err) {
      alert('Error deleting event');
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Manage Events</h1>
            <p className="text-gray-600 mt-1">Create, update, and delete events</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingEvent(null);
              setFormData({
                title: '',
                desc: '',
                date: '',
                time: '',
                location: '',
                img: '',
                image: null,
                registration_link: '',
                is_past: false,
              });
              setImagePreview(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Event
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow mb-6">
            <h2 className="text-2xl font-bold mb-4">
              {editingEvent ? 'Edit Event' : 'Create Event'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={formData.desc}
                  onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="3"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Date *</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Time</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
                {!imagePreview && formData.img && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">Current image:</p>
                    <img
                      src={formData.img}
                      alt="Current"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Registration Link</label>
                <input
                  type="url"
                  value={formData.registration_link}
                  onChange={(e) => setFormData({ ...formData, registration_link: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.is_past}
                    onChange={(e) => setFormData({ ...formData, is_past: e.target.checked })}
                    className="mr-2"
                  />
                  Mark as Past Event
                </label>
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  {editingEvent ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingEvent(null);
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
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event) => (
                <tr key={event._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{event.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{event.location || 'N/A'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded text-xs ${
                      event.is_past ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {event.is_past ? 'Past' : 'Upcoming'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {events.length === 0 && (
            <div className="text-center py-8 text-gray-500">No events found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

