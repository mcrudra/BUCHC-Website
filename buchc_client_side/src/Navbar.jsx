import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import logo from "../src/assets/logo.png";
import { fetchJoinLink } from "./services/api";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [joinLink, setJoinLink] = useState("");

  useEffect(() => {
    const loadJoinLink = async () => {
      const link = await fetchJoinLink();
      setJoinLink(link);
    };
    loadJoinLink();
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  const navItems = [
    { label: "Home", sectionId: "home" },
    { label: "Our Team", sectionId: "our-team" },
    { label: "Top Players", sectionId: "top-players" },
    { label: "Events", sectionId: "events" },
    { label: "Contact Us", sectionId: "contact" },
  ];

  const handleJoinClick = () => {
    if (joinLink) {
      window.open(joinLink, "_blank");
    }
  };

  return (
    <nav className="w-full bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img
              src={logo}
              alt="BUCHC Logo"
              className="w-12 h-12 rounded-full"
            />
            <span className="text-lg md:text-xl text-gray-800">
              BRAC University Chess Club
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.sectionId)}
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={handleJoinClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium"
            >
              Join BUCHC
            </button>
          </div>
          <button
            className="md:hidden text-gray-700"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="block w-full text-left px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-50 rounded-md font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={handleJoinClick}
                className="block w-full text-left px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium"
              >
                Join BUCHC
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
