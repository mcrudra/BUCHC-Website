import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { fetchAllSettings } from "../services/api";

export default function RegistrationBanner({
  compact = false,
  showAction = true,
}) {
  const [settings, setSettings] = useState({
    registration_open: "false",
    registration_live_text: "Registration is live now",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings(data);
      setLoading(false);
    };

    loadSettings();
  }, []);

  if (loading || settings.registration_open !== "true") {
    return null;
  }

  const liveText =
    settings.registration_live_text || "Registration is live now";

  const content = (
    <div className="registration-live-marquee py-2 sm:py-3">
      <div className="registration-live-track">
        <span className="registration-live-copy uppercase tracking-[0.35em] text-xs sm:text-sm font-semibold text-green-100/95">
          {liveText} • {liveText} • {liveText} • {liveText} •
        </span>
        <span
          className="registration-live-copy uppercase tracking-[0.35em] text-xs sm:text-sm font-semibold text-blue-100/95"
          aria-hidden="true"
        >
          {liveText} • {liveText} • {liveText} • {liveText} •
        </span>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_10px_40px_rgba(8,15,30,0.18)]">
        <div className="px-4 sm:px-6">
          {content}
          {showAction && (
            <div className="pb-4 sm:pb-5 flex justify-end">
              <button
                onClick={() => navigate("/registration")}
                className="inline-flex items-center gap-2 rounded-full border border-blue-300/30 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
              >
                Go to registration
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full border-b border-white/10 bg-white/5 backdrop-blur-md text-white shadow-[0_12px_30px_rgba(7,12,22,0.12)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 py-2 sm:py-3">
          <div className="h-2.5 w-2.5 rounded-full bg-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.8)] animate-pulse shrink-0" />
          <div className="flex-1 overflow-hidden">{content}</div>
          {showAction && (
            <button
              onClick={() => navigate("/registration")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition shrink-0"
            >
              Register now
              <ArrowRight size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
