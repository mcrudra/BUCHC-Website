import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllSettings } from "../services/api";

export default function Hero() {
  const [settings, setSettings] = useState({ registration_open: "false" });
  const [isMobile, setIsMobile] = useState(false);
  const [bgUrl, setBgUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

  useEffect(() => {
    const check = () => {
      if (typeof window !== "undefined") setIsMobile(window.innerWidth <= 640);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Preload the image — only reveal it once fully downloaded
  useEffect(() => {
    const url = isMobile
      ? settings.hero_image_mobile
      : settings.hero_image_desktop;

    if (!url) return;

    const img = new window.Image();
    img.onload = () => setBgUrl(url);
    img.onerror = () => {};
    img.src = url;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [isMobile, settings.hero_image_desktop, settings.hero_image_mobile]);

  // Derived: skeleton shows while target URL exists but hasn't finished loading yet
  const targetUrl = isMobile
    ? settings.hero_image_mobile
    : settings.hero_image_desktop;
  const imgLoading = !!targetUrl && bgUrl !== targetUrl;

  const handleJoinClick = () => {
    navigate("/registration");
  };

  return (
    <div
      className="relative min-h-screen flex items-center bg-cover bg-center md:bg-center bg-[length:140%] sm:bg-[length:120%] md:bg-cover"
      style={{
        backgroundImage: bgUrl ? `url(${bgUrl})` : undefined,
        backgroundPosition: isMobile ? "center 28%" : "center center",
      }}
    >
      {imgLoading && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      )}

      <div className="absolute inset-0 bg-black/55" />

      <div id="home" className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-12">
        <div className="max-w-2xl">
          <div className="text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Where Strategy
              <br />
              <span className="text-yellow-400">Meets Campus Life</span>
            </h1>
            <p className="text-base mb-10">
              Join BRAC University's premier chess community. Whether you're a
              grandmaster or just learning the game, BUCHC is your home for
              competitive play, strategic thinking, and lifelong friendships.
            </p>
            <button
              onClick={handleJoinClick}
              className="rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-4 text-xl font-bold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:from-amber-400 hover:to-amber-500"
            >
              {settings.registration_open === "true"
                ? "Register Now"
                : "Join BUCHC Today"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

