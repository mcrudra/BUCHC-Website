import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getSettings, updateSettings } from "../../services/adminApi";

export default function RegistrationManagement() {
  const [formData, setFormData] = useState({
    registration_open: "false",
    registration_page_title: "BUCHC Registration",
    registration_page_description: "",
    registration_semester_label: "Spring 26",
    registration_live_text: "Registration is live now",
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
      setFormData((current) => ({
        ...current,
        ...response.data,
        registration_open: response.data.registration_open ?? "false",
        registration_semester_label:
          response.data.registration_semester_label ?? "Spring 26",
      }));
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
    setSaving(true);
    try {
      await updateSettings(formData);
      alert("Registration settings saved successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message || "Error saving registration settings",
      );
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
      <div className="max-w-3xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Registration
          </h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Control the public registration page and active semester label
          </p>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
              <input
                id="registration_open"
                type="checkbox"
                checked={formData.registration_open === "true"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_open: e.target.checked ? "true" : "false",
                  })
                }
                className="h-4 w-4"
              />
              <label
                htmlFor="registration_open"
                className="text-sm font-medium text-gray-700"
              >
                Registration is currently open
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={formData.registration_page_title}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_page_title: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="BUCHC Registration"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Page Description
              </label>
              <textarea
                value={formData.registration_page_description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_page_description: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                rows="4"
                placeholder="Short description shown above the form"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Active Registration Semester
              </label>
              <input
                type="text"
                value={formData.registration_semester_label}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_semester_label: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Spring 26"
              />
              <p className="text-xs text-gray-500 mt-1">
                This label is stored with each registration and is used for
                semester-wise sorting and export.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Live Banner Text
              </label>
              <input
                type="text"
                value={formData.registration_live_text}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    registration_live_text: e.target.value,
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Registration is live now"
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={saving}
                className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Registration Settings"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
