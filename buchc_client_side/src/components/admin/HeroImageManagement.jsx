import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getSettings } from "../../services/adminApi";
import { uploadHeroImage } from "../../services/adminApi";

function HeroImageCard({ label, settingKey, currentUrl, onUploadSuccess }) {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState(null);
  const inputRef = useRef(null);

  const type = settingKey === "hero_image_desktop" ? "desktop" : "mobile";

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setStatus(null);
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setStatus(null);
    try {
      const res = await uploadHeroImage(type, file);
      setStatus({ type: "success", message: "Image uploaded successfully!" });
      setFile(null);
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
      onUploadSuccess(settingKey, res.data.url);
    } catch (err) {
      setStatus({
        type: "error",
        message: err.response?.data?.message || "Upload failed",
      });
    } finally {
      setUploading(false);
    }
  };

  const displayUrl = preview || currentUrl;

  return (
    <div className="bg-white rounded-lg shadow p-4 sm:p-6">
      <h2 className="text-lg font-semibold text-black mb-4">{label}</h2>

      {/* Current / Preview Image */}
      <div className="mb-4">
        {displayUrl ? (
          <img
            src={displayUrl}
            alt={label}
            className="w-full rounded-md object-cover border border-gray-200"
            style={{ maxHeight: type === "mobile" ? "320px" : "200px", objectPosition: "center top" }}
          />
        ) : (
          <div className="w-full h-32 rounded-md border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 text-sm">
            No image set
          </div>
        )}
        {preview && (
          <p className="text-xs text-amber-600 mt-1">Preview — not uploaded yet</p>
        )}
      </div>

      {/* File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 mb-3"
      />

      <p className="text-xs text-gray-500 mb-3">Max 5 MB. JPG, PNG, or WebP recommended.</p>

      {/* Status */}
      {status && (
        <p
          className={`text-sm mb-3 font-medium ${
            status.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {status.message}
        </p>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700 disabled:opacity-50 text-sm font-medium"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
}

export default function HeroImageManagement() {
  const [heroImages, setHeroImages] = useState({
    hero_image_desktop: "",
    hero_image_mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const res = await getSettings();
        setHeroImages({
          hero_image_desktop: res.data.hero_image_desktop || "",
          hero_image_mobile: res.data.hero_image_mobile || "",
        });
      } catch (err) {
        if (err.response?.status === 401) navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [navigate]);

  const handleUploadSuccess = (key, url) => {
    setHeroImages((prev) => ({ ...prev, [key]: url }));
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
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-black">Hero Images</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">
            Upload the background images shown on the homepage hero section. Falls back to the
            bundled default images if not set.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <HeroImageCard
            label="Desktop Hero Image"
            settingKey="hero_image_desktop"
            currentUrl={heroImages.hero_image_desktop}
            onUploadSuccess={handleUploadSuccess}
          />
          <HeroImageCard
            label="Mobile Hero Image"
            settingKey="hero_image_mobile"
            currentUrl={heroImages.hero_image_mobile}
            onUploadSuccess={handleUploadSuccess}
          />
        </div>

        <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
          <strong>Tips:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>Desktop: landscape orientation works best (e.g. 1920×1080).</li>
            <li>Mobile: portrait orientation works best (e.g. 750×1334).</li>
            <li>Uploading a new image automatically removes the old one from Cloudinary.</li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
}
