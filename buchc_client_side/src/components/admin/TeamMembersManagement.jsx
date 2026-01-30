import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './AdminLayout';
import { getTeamMembers, createTeamMember, updateTeamMember, deleteTeamMember } from '../../services/adminApi';

const positionOptions = {
  governing: ['President', 'Vice President', 'General Secretary', 'Joint Secretary', 'Treasurer', 'General Co-ordinator'],
  em: ['Director', 'Co-Director', 'Asst. Director'],
  creative: ['Director', 'Co-Director', 'Asst. Director'],
  training: ['Director', 'Co-Director', 'Asst. Director'],
  hr: ['Director', 'Co-Director', 'Asst. Director'],
};

export default function TeamMembersManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    department: 'governing',
    photo: '',
    photoFile: null, // File object
    mail: '',
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getTeamMembers();
      setMembers(response.data);
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
      // Prepare data - include photo file if selected
      const submitData = { ...formData };
      if (submitData.photoFile) {
        // If new photo file is selected, use it as 'photo' for the API
        submitData.photo = submitData.photoFile;
      }
      // Remove photoFile from submitData (keep photo URL if no new file)
      delete submitData.photoFile;

      if (editingMember) {
        await updateTeamMember(editingMember._id, submitData);
      } else {
        await createTeamMember(submitData);
      }
      setShowForm(false);
      setEditingMember(null);
      setFormData({
        name: '',
        position: '',
        department: 'governing',
        photo: '',
        photoFile: null,
        mail: '',
      });
      setPhotoPreview(null);
      loadMembers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error saving team member');
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photoFile: file, photo: '' });
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      position: member.position,
      department: member.department,
      photo: member.photo || '',
      photoFile: null,
      mail: member.mail || '',
    });
    setPhotoPreview(member.photo || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    try {
      await deleteTeamMember(id);
      loadMembers();
    } catch (err) {
      alert('Error deleting team member');
    }
  };

  const updatePositions = (department) => {
    setFormData({ ...formData, department, position: positionOptions[department][0] });
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
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Team Members</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">Create, update, and delete team members</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingMember(null);
              setFormData({
                name: '',
                position: '',
                department: 'governing',
                photo: '',
                photoFile: null,
                mail: '',
              });
              setPhotoPreview(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Team Member
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4">
              {editingMember ? 'Edit Team Member' : 'Create Team Member'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <label className="block text-sm font-medium mb-1">Department *</label>
                <select
                  value={formData.department}
                  onChange={(e) => updatePositions(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="governing">Governing Body</option>
                  <option value="em">Event Management</option>
                  <option value="creative">Creative & IT</option>
                  <option value="training">Training & Research</option>
                  <option value="hr">HR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Position *</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  {positionOptions[formData.department].map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  value={formData.mail}
                  onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
                {photoPreview && (
                  <div className="mt-2">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                  </div>
                )}
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
                >
                  {editingMember ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingMember(null);
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
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member._id}>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{member.name}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{member.position}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{member.department}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">{member.mail || 'N/A'}</td>
                    <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          onClick={() => handleEdit(member)}
                          className="text-purple-600 hover:text-purple-800 text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(member._id)}
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
          {members.length === 0 && (
            <div className="text-center py-8 text-gray-500">No team members found</div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

