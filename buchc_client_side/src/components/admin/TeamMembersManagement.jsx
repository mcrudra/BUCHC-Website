import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import {
  getTeamMembers,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
} from "../../services/adminApi";

const DEFAULT_TEAM_PHOTO = "/logo-Ba1-O6YK.png";

const positionOptions = {
  governing: [
    "President",
    "Vice President",
    "General Secretary",
    "Asst. General Secretary",
    "Joint Secretary",
    "Treasurer",
    "General Co-ordinator",
  ],
  em: ["Director", "Co-Director", "Asst. Director"],
  creative: ["Director", "Co-Director", "Asst. Director"],
  training: ["Director", "Co-Director", "Asst. Director"],
  hr: ["Director", "Co-Director", "Asst. Director"],
};

export default function TeamMembersManagement() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    position: "",
    department: "governing",
    photo: "",
    photoFile: null, // File object
    mail: "",
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const isEditModal = showForm && !!editingMember;
  const isAddingNew = showForm && !editingMember;

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    try {
      const response = await getTeamMembers();
      setMembers(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Prepare data - include photo file if selected
      const submitData = { ...formData };
      if (submitData.photoFile) {
        // If new photo file is selected, use it as 'photo' for the API
        submitData.photo = submitData.photoFile;
      } else if (!submitData.photo) {
        submitData.photo = DEFAULT_TEAM_PHOTO;
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
        name: "",
        position: "",
        department: "governing",
        photo: "",
        photoFile: null,
        mail: "",
      });
      setPhotoPreview(null);
      loadMembers();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving team member");
    } finally {
      setSubmitting(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, photoFile: file, photo: "" });
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
      photo: member.photo || "",
      photoFile: null,
      mail: member.mail || "",
    });
    setPhotoPreview(member.photo || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await deleteTeamMember(id);
      loadMembers();
    } catch (err) {
      alert("Error deleting team member");
    }
  };

  const updatePositions = (department) => {
    setFormData({
      ...formData,
      department,
      position: positionOptions[department][0],
    });
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        {" "}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Manage Team Members
            </h1>
            <p className="text-black mt-1 text-sm sm:text-base">
              Create, update, and delete team members
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingMember(null);
              setFormData({
                name: "",
                position: "",
                department: "governing",
                photo: "",
                photoFile: null,
                mail: "",
              });
              setPhotoPreview(null);
            }}
            className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Team Member
          </button>
        </div>
        {showForm && (
          <div
            className={
              isEditModal
                ? "fixed inset-0 z-50 flex items-center justify-center p-4"
                : ""
            }
          >
            {isEditModal && (
              <div
                className="absolute inset-0 bg-black/50"
                onClick={() => {
                  if (submitting) return;
                  setShowForm(false);
                  setEditingMember(null);
                }}
              />
            )}
            <div
              className={
                isEditModal
                  ? "relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white p-4 sm:p-6 rounded-lg shadow"
                  : "bg-white p-4 sm:p-6 rounded-lg shadow mb-6"
              }
            >
              {isEditModal && (
                <button
                  type="button"
                  onClick={() => {
                    if (submitting) return;
                    setShowForm(false);
                    setEditingMember(null);
                  }}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  aria-label="Close edit modal"
                >
                  <X size={18} />
                </button>
              )}
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                {editingMember ? "Edit Team Member" : "Create Team Member"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Department *
                  </label>
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
                  <label className="block text-sm font-medium mb-1">
                    Position *
                  </label>
                  <select
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
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
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.mail}
                    onChange={(e) =>
                      setFormData({ ...formData, mail: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Photo
                  </label>
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
                    disabled={submitting}
                    className={`bg-purple-600 text-white px-4 py-2 rounded-md ${submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-700"}`}
                  >
                    {submitting
                      ? editingMember
                        ? "Updating..."
                        : "Creating..."
                      : editingMember
                        ? "Update"
                        : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingMember(null);
                    }}
                    disabled={submitting}
                    className={`bg-gray-300 text-black px-4 py-2 rounded-md ${submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-gray-400"}`}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {!isAddingNew && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            {/* Mobile Card View */}
            <div className="block md:hidden">
              <div className="space-y-4 p-4">
                {members.map((member) => (
                  <div
                    key={member._id}
                    className="border rounded-lg p-4 shadow-sm bg-white"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <img
                        src={member.photo || DEFAULT_TEAM_PHOTO}
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-gray-500">
                          {member.position}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Department:</span>{" "}
                        {member.department}
                      </p>

                      <p>
                        <span className="font-medium">Email:</span>{" "}
                        {member.mail || "N/A"}
                      </p>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleEdit(member)}
                        className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-md text-sm hover:bg-purple-200"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(member._id)}
                        className="flex-1 bg-red-100 text-red-700 py-2 rounded-md text-sm hover:bg-red-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Position
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {members.map((member) => (
                    <tr key={member._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {member.name}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                          {member.position || "OG Member"}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {member.department}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {member.mail || "N/A"}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(member)}
                            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(member._id)}
                            className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700 hover:bg-red-200"
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
              <div className="text-center py-8 text-black">
                No team members found
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
