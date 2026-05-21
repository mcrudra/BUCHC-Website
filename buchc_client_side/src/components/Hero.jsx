import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/hero_background.jpg";
import { fetchAllSettings } from "../services/api";

export default function Hero() {
  const [settings, setSettings] = useState({ registration_open: "false" });
  const navigate = useNavigate();

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

  const handleJoinClick = () => {
    navigate("/registration");
  };

  return (
    <div
      className="relative min-h-screen flex items-center bg-cover bg-center"
      style={{ backgroundImage: `url(${logo})` }}
    >
      <div className="absolute inset-0 bg-black/55 "></div>
      <div id="home" className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
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
              className="bg-blue-700 hover:bg-blue-900 text-white font-bold text-xl px-8 py-4 rounded-lg shadow hover:shadow-lg transition"
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
