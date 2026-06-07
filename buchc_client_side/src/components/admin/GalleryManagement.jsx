import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import AdminLayout from "./AdminLayout";
import {
  getGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../../services/adminApi";

const DEFAULT_GALLERY_IMAGE = "/logo-Ba1-O6YK.png";
const MAX_DESCRIPTION_CHARS = 330;

export default function GalleryManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imageFile: null,
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [viewingDescriptionItem, setViewingDescriptionItem] = useState(null);
  const navigate = useNavigate();
  const isEditModal = showForm && !!editingItem;
  const isAddingNew = showForm && !editingItem;
  const descriptionCharCount = formData.description.length;
  const isDescriptionTooLong = descriptionCharCount > MAX_DESCRIPTION_CHARS;

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const response = await getGalleryItems();
      setItems(response.data);
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

    if (isDescriptionTooLong) {
      alert(
        `Description must be within ${MAX_DESCRIPTION_CHARS} characters. Current: ${descriptionCharCount} characters.`,
      );
      return;
    }

    setSubmitting(true);

    try {
      const submitData = { ...formData };

      if (submitData.imageFile) {
        submitData.image = submitData.imageFile;
      } else if (!submitData.image) {
        submitData.image = DEFAULT_GALLERY_IMAGE;
      }

      delete submitData.imageFile;

      if (editingItem) {
        await updateGalleryItem(editingItem._id, submitData);
      } else {
        await createGalleryItem(submitData);
      }

      setShowForm(false);
      setEditingItem(null);
      setFormData({
        title: "",
        description: "",
        image: "",
        imageFile: null,
      });
      setImagePreview(null);
      loadItems();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving gallery item");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, imageFile: file, image: "" });

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || "",
      description: item.description || "",
      image: item.image || "",
      imageFile: null,
    });
    setImagePreview(item.image || null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this gallery item?")) return;

    try {
      await deleteGalleryItem(id);
      loadItems();
    } catch (err) {
      alert("Error deleting gallery item");
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
            <h1 className="text-2xl sm:text-3xl font-bold text-black">
              Manage Gallery
            </h1>
            <p className="text-black mt-1 text-sm sm:text-base">
              Create, update, and delete gallery items
            </p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingItem(null);
              setFormData({
                title: "",
                description: "",
                image: "",
                imageFile: null,
              });
              setImagePreview(null);
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700"
          >
            + Add Gallery Item
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
                  setEditingItem(null);
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
                    setEditingItem(null);
                  }}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                  aria-label="Close edit modal"
                >
                  <X size={18} />
                </button>
              )}
              <h2 className="text-xl sm:text-2xl font-bold mb-4">
                {editingItem ? "Edit Gallery Item" : "Create Gallery Item"}
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
                    rows={4}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-md ${isDescriptionTooLong ? "border-red-500" : ""}`}
                  />
                  <p
                    className={`mt-1 text-xs ${isDescriptionTooLong ? "text-red-600" : "text-gray-500"}`}
                  >
                    {descriptionCharCount}/{MAX_DESCRIPTION_CHARS} characters
                  </p>
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
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={submitting || isDescriptionTooLong}
                    className={`bg-purple-600 text-white px-4 py-2 rounded-md ${submitting ? "opacity-60 cursor-not-allowed" : "hover:bg-purple-700"}`}
                  >
                    {submitting
                      ? editingItem
                        ? "Updating..."
                        : "Creating..."
                      : editingItem
                        ? "Update"
                        : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingItem(null);
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
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Image
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Title
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Description
                    </th>
                    <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-black uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {items.map((item) => (
                    <tr key={item._id}>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm">
                        <img
                          src={item.image || DEFAULT_GALLERY_IMAGE}
                          alt={item.title}
                          className="w-14 h-14 object-cover rounded border"
                        />
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm font-medium">
                        {item.title}
                      </td>
                      <td className="px-3 sm:px-6 py-4 text-sm max-w-md">
                        <button
                          type="button"
                          onClick={() => setViewingDescriptionItem(item)}
                          className="inline-flex items-center rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700 hover:bg-cyan-200"
                        >
                          View
                        </button>
                      </td>
                      <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => handleEdit(item)}
                            className="inline-flex items-center rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-200"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
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
            {items.length === 0 && (
              <div className="text-center py-8 text-black">
                No gallery items found
              </div>
            )}
          </div>
        )}

        {viewingDescriptionItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setViewingDescriptionItem(null)}
          >
            <div className="absolute inset-0 bg-black/50" />
            <div
              className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-hidden rounded-lg bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setViewingDescriptionItem(null)}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                aria-label="Close description modal"
              >
                <X size={18} />
              </button>

              <div className="p-5 sm:p-6 border-b border-gray-200">
                <h3 className="text-lg sm:text-xl font-bold text-black pr-8">
                  {viewingDescriptionItem.title}
                </h3>
              </div>

              <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto">
                <p className="text-sm sm:text-base leading-7 text-black whitespace-pre-wrap">
                  {viewingDescriptionItem.description ||
                    "No description available for this gallery item."}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
