import { useState, useEffect } from "react";
import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";
import { fetchAllSettings } from "./services/api";

export default function Footer() {
  const [settings, setSettings] = useState({
    join_link: "",
    club_email: "",
    facebook_link: "",
    instagram_link: "",
    linkedin_link: "",
  });

  useEffect(() => {
    const loadSettings = async () => {
      const data = await fetchAllSettings();
      setSettings(data);
    };
    loadSettings();
  }, []);

  const handleJoinClick = () => {
    if (settings.join_link) {
      window.open(settings.join_link, "_blank");
    }
  };

  const handleEmailClick = () => {
    if (settings.club_email) {
      window.location.href = `mailto:${settings.club_email}`;
    }
  };

  const handleSocialClick = (link) => {
    if (link) {
      window.open(link, "_blank");
    }
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer id="contact" className="bg-gradient-to-b from-[#0b1220] to-[#060b16] text-gray-300 pt-12 sm:pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h3 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
            Get In Touch
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm px-4">
            Have questions? Want to join? We'd love to hear from you!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <div
            onClick={handleEmailClick}
            className={`bg-[#111a2e] rounded-xl px-4 sm:px-6 py-4 sm:py-5 w-full sm:w-64 text-center shadow-md hover:shadow-lg transition ${settings.club_email ? 'cursor-pointer' : 'cursor-default'}`}
          >
            <Mail className="mx-auto mb-3 text-blue-500" size={20} />
            <p className="text-sm text-gray-400 mb-1">Email Us</p>
            <p className="text-white text-sm font-medium">
              {settings.club_email || "club.buchc@bracu.ac.bd"}
            </p>
          </div>

          <div className="bg-[#111a2e] rounded-xl px-4 sm:px-6 py-4 sm:py-5 w-full sm:w-64 text-center shadow-md hover:shadow-lg transition">
            <MapPin className="mx-auto mb-3 text-blue-500" size={20} />
            <p className="text-xs sm:text-sm text-gray-400 mb-1">Visit Us</p>
            <p className="text-white text-xs sm:text-sm font-medium">
              BRAC University
              <br />
              Kha 224 Pragati Sarani, Merul Badda , Dhaka 1212
            </p>
          </div>
        </div>
        <div className="text-center mb-8 sm:mb-12">
          <button
            onClick={handleJoinClick}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-lg transition w-full sm:w-auto"
          >
            Join BUCHC Today
          </button>
        </div>
        <div className="border-t border-white/10 my-10"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center font-bold text-white">
              BU
            </div>
            <p className="text-sm text-gray-400 max-w-xs">
              BRAC University Chess Club – Building strategic minds since 2015.
            </p>
          </div>
          <div className="text-sm">
            <p className="text-white font-medium mb-2">Quick Links</p>
            <ul className="space-y-1 text-gray-400">
              <li onClick={() => scrollToSection("home")} className="hover:text-white cursor-pointer">Home</li>
              <li onClick={() => scrollToSection("our-team")} className="hover:text-white cursor-pointer">Our Team</li>
              <li onClick={() => scrollToSection("top-players")} className="hover:text-white cursor-pointer">Top Players</li>
              <li onClick={() => scrollToSection("events")} className="hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-2 text-sm">Follow Us</p>
            <div className="flex gap-4">
              <Facebook
                size={18}
                onClick={() => handleSocialClick(settings.facebook_link)}
                className={`${settings.facebook_link ? 'hover:text-blue-500 cursor-pointer' : 'cursor-default opacity-50'}`}
              />
              <Instagram
                size={18}
                onClick={() => handleSocialClick(settings.instagram_link)}
                className={`${settings.instagram_link ? 'hover:text-pink-500 cursor-pointer' : 'cursor-default opacity-50'}`}
              />
              <Linkedin
                size={18}
                onClick={() => handleSocialClick(settings.linkedin_link)}
                className={`${settings.linkedin_link ? 'hover:text-blue-400 cursor-pointer' : 'cursor-default opacity-50'}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 text-center py-4 text-xs text-gray-500">
        © 2025 BRAC University Chess Club (BUCHC). All rights reserved.
      </div>
    </footer>
  );
}
