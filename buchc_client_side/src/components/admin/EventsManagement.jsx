import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Loader2, X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent,
} from "../../services/adminApi";

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    date: "",
    time: "",
    location: "",
    img: "",
    image: null, // File object
    registration_link: "",
    is_past: false,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEditModal = showForm && !!editingEvent;
  const isAddingNew = showForm && !editingEvent;

  const handleEditFromUrl = useCallback(
    async (eventId) => {
      try {
        const response = await getEvent(eventId);
        const event = response.data;
        setEditingEvent(event);
        setFormData({
          title: event.title,
          desc: event.desc || "",
          date: event.date
            ? new Date(event.date).toISOString().split("T")[0]
            : "",
          time: event.time || "",
          location: event.location || "",
          img: event.img || "",
          image: null,
          registration_link: event.registration_link || "",
          is_past: event.is_past || false,
        });
        setImagePreview(event.img || null);
        setShowForm(true);
        // Remove the edit parameter from URL
        navigate("/admin/events", { replace: true });
      } catch (err) {
        console.error("Error loading event for edit:", err);
        alert("Failed to load event for editing");
      }
    },
    [navigate],
  );

  const loadEvents = useCallback(async () => {
    try {
      const response = await getEvents();
      setEvents(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadEvents();

    // Check if there's an edit parameter in the URL
    const editId = searchParams.get("edit");
    if (editId) {
      handleEditFromUrl(editId);
    }
  }, [searchParams, handleEditFromUrl, loadEvents]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
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
        title: "",
        desc: "",
        date: "",
        time: "",
        location: "",
        img: "",
        image: null,
        registration_link: "",
        is_past: false,
      });
      setImagePreview(null);
      loadEvents();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving event");
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file, img: "" });
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
      desc: event.desc || "",
      date: event.date ? new Date(event.date).toISOString().split("T")[0] : "",
      time: event.time || "",
      location: event.location || "",
      img: event.img || "",
      image: null,
      registration_link: event.registration_link || "",
      is_past: event.is_past || false,
    });
    setImagePreview(event.img || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await deleteEvent(id);
      loadEvents();
    } catch {
      alert("Error deleting event");
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
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6">
        {" "}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Manage Events
            </h1>
            <p className="text-black mt-1 text-sm sm:text-base">
              Create, update, and delete events
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingEvent(null);
              setFormData({
                title: "",
                desc: "",
                date: "",
                time: "",
                location: "",
                img: "",
                image: null,
                registration_link: "",
                is_past: false,
              });
              setImagePreview(null);
            }}
            className="w-full sm:w-auto bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Event
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
                  if (saving) return;
                  setShowForm(false);
                  setEditingEvent(null);
                }}
              />
            )}
            <div
              className={
                isEditModal
                  ? "relative z-10 w-full max-w-lg sm:max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-4 sm:p-6 rounded-lg shadow"
                  : "relative bg-white p-4 sm:p-6 rounded-lg shadow mb-6"
              }
            >
              {isEditModal && (
                <button
                  type="button"
                  onClick={() => {
                    if (saving) return;
                    setShowForm(false);
                    setEditingEvent(null);
                  }}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  aria-label="Close edit modal"
                >
                  <X size={18} />
                </button>
              )}
              {saving && (
                <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70 backdrop-blur-[1px]">
                  <div className="flex items-center gap-3 rounded-full bg-white px-4 py-2 text-sm font-medium text-purple-700 shadow-lg">
                    <Loader2 className="animate-spin" size={18} />
                    Saving event...
                  </div>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                {editingEvent ? "Edit Event" : "Create Event"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Description
                  </label>
                  <textarea
                    value={formData.desc}
                    onChange={(e) =>
                      setFormData({ ...formData, desc: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                    rows="3"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Date *
                    </label>
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Time
                    </label>
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) =>
                        setFormData({ ...formData, time: e.target.value })
                      }
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Image
                  </label>
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
                      <p className="text-sm text-black mb-1">Current image:</p>
                      <img
                        src={formData.img}
                        alt="Current"
                        className="w-32 h-32 object-cover rounded-md border"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Registration Link
                  </label>
                  <input
                    type="url"
                    value={formData.registration_link}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        registration_link: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.is_past}
                      onChange={(e) =>
                        setFormData({ ...formData, is_past: e.target.checked })
                      }
                      className="mr-2"
                    />
                    Mark as Past Event
                  </label>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full sm:w-auto inline-flex justify-center items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {saving && <Loader2 size={16} className="animate-spin" />}
                    {saving
                      ? editingEvent
                        ? "Updating..."
                        : "Creating..."
                      : editingEvent
                        ? "Update"
                        : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingEvent(null);
                    }}
                    disabled={saving}
                    className="w-full sm:w-auto bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
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
            {/* Mobile Cards */}
            <div className="block md:hidden p-4 space-y-4">
              {events.map((event) => (
                <div
                  key={event._id}
                  className="border rounded-xl p-4 shadow-sm"
                >
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>

                  <div className="space-y-1 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-black">Date:</span>{" "}
                      {new Date(event.date).toLocaleDateString()}
                    </p>

                    <p>
                      <span className="font-medium text-black">Location:</span>{" "}
                      {event.location || "N/A"}
                    </p>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        event.is_past
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {event.is_past ? "Past Event" : "Upcoming Event"}
                    </span>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(event)}
                      className="flex-1 rounded-md bg-purple-100 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(event._id)}
                      className="flex-1 rounded-md bg-red-100 py-2 text-sm font-medium text-red-700 hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event._id}>
                      <td className="px-6 py-4">{event.title}</td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(event.date).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4">{event.location || "N/A"}</td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-medium leading-none ${
                            event.is_past
                              ? "bg-red-100 text-red-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {event.is_past ? "Past Event" : "Upcoming Event"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-200"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(event._id)}
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

            {events.length === 0 && (
              <div className="text-center py-8 text-black">No events found</div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
