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
    <div className="registration-live-marquee py-1 sm:py-3">
      <div className="registration-live-track">
        <span className="registration-live-copy uppercase tracking-[0.22em] text-[11px] sm:text-sm font-medium text-amber-100/90">
          {liveText} • {liveText} • {liveText} • {liveText} •
        </span>
        <span
          className="registration-live-copy uppercase tracking-[0.22em] text-[11px] sm:text-sm font-medium text-slate-300/90"
          aria-hidden="true"
        >
          {liveText} • {liveText} • {liveText} • {liveText} •
        </span>
      </div>
    </div>
  );

  if (compact) {
    return (
      <div className="registration-banner-shell mx-4 sm:mx-6 rounded-2xl border border-amber-300/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_12px_35px_rgba(2,6,23,0.28)]">
        <div className="relative overflow-hidden px-4 sm:px-6">
          <div className="flex justify-center">{content}</div>
          {showAction && (
            <div className="pb-3 sm:pb-4 flex justify-center">
              <button
                onClick={() => navigate("/registration")}
                className="inline-flex items-center gap-2 rounded-full border border-amber-300/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
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
    <div className="registration-banner-shell w-full border-b border-amber-300/10 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 text-white shadow-[0_12px_35px_rgba(2,6,23,0.22)]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-1/4 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/45 to-transparent" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center gap-1 py-1.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:py-2">
          <div className="inline-flex items-center gap-2 self-center mt-4 sm:mt-0 rounded-full border border-amber-300/15 bg-white/5 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-amber-100/80">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-300 ring-4 ring-emerald-300/15 shadow-[0_0_10px_rgba(74,222,128,0.95),0_0_24px_rgba(74,222,128,0.7),0_0_42px_rgba(74,222,128,0.45)] animate-[pulse_0.7s_ease-in-out_infinite] shrink-0" />
            Registration Open
          </div>
          <div className="flex-1 overflow-hidden text-center sm:text-left">
            {content}
          </div>
          {showAction && (
            <button
              onClick={() => navigate("/registration")}
              className="inline-flex items-center gap-2 self-center sm:self-auto rounded-full border border-amber-300/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition shrink-0"
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
