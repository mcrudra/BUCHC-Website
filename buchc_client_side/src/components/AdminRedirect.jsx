import { useEffect } from "react";

export default function AdminRedirect() {
  useEffect(() => {
    // Get the backend admin URL from environment variable or construct it
    const backendAdminUrl = import.meta.env.VITE_ADMIN_URL || 
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://localhost:8000/buchcadmin'
        : `${window.location.protocol}//${window.location.hostname}/buchcadmin`);
    
    // Redirect to backend admin panel
    window.location.href = backendAdminUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to admin panel...</p>
      </div>
    </div>
  );
}

