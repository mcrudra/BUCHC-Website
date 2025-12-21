import { useEffect } from "react";

export default function AdminRedirect() {
  useEffect(() => {
    // Get the current hostname and protocol
    const currentHost = window.location.hostname;
    const protocol = window.location.protocol;
    
    // For development, use localhost:8000, for production use same hostname
    const backendUrl = currentHost === 'localhost' || currentHost === '127.0.0.1'
      ? `${protocol}//${currentHost}:8000/buchcadmin`
      : `${protocol}//${currentHost}/buchcadmin`;
    
    // Redirect to backend admin panel
    window.location.href = backendUrl;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <p className="text-gray-600">Redirecting to admin panel...</p>
      </div>
    </div>
  );
}

