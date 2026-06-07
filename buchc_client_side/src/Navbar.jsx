import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../src/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < 12 || currentScrollY < lastScrollY) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 12) {
        setVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      if (sectionId === "contact") {
        const offset = window.innerWidth < 640 ? 80 : 120;
        const targetTop =
          window.scrollY + element.getBoundingClientRect().top - offset;
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      } else {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setOpen(false);
  };

  const navItems = [
    { label: "Home", sectionId: "home" },
    { label: "Our Team", sectionId: "our-team" },
    { label: "Top Players", sectionId: "top-players" },
    { label: "Events", sectionId: "events" },
    { label: "BUCHC Gallery", route: "/galary" },
    { label: "Contact Us", sectionId: "contact" },
  ];

  const handleJoinClick = () => {
    navigate("/registration");
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 w-full border-b border-white/10 bg-slate-950/88 backdrop-blur-xl shadow-[0_10px_40px_rgba(2,6,23,0.45)] transform transition-transform duration-150 ease-out will-change-transform ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-2">
          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className="rounded-full border border-amber-400/30 bg-white/5 p-1 shadow-[0_0_30px_rgba(202,138,4,0.15)]">
                <img
                  src={logo}
                  alt="BUCHC Logo"
                  className="w-11 h-11 rounded-full"
                />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-[0.32em] text-amber-200/70">
                  BRAC University
                </span>
                <span className="block text-sm md:text-lg font-semibold text-white">
                  Chess Club
                </span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) =>
              item.sectionId ? (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-slate-300 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.route);
                    setOpen(false);
                  }}
                  className="text-slate-300 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </button>
              ),
            )}
            <button
              onClick={handleJoinClick}
              className="rounded-full border border-amber-300/30 bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2 font-semibold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:from-amber-400 hover:to-amber-500"
            >
              Join BUCHC
            </button>
          </div>
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="md:hidden">
            <div className="space-y-1 border-t border-white/10 bg-slate-950/95 px-2 pt-2 pb-3">
              {navItems.map((item) =>
                item.sectionId ? (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId)}
                    className="block w-full rounded-md px-3 py-2 text-left font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => {
                      navigate(item.route);
                      setOpen(false);
                    }}
                    className="block w-full rounded-md px-3 py-2 text-left font-medium text-slate-300 hover:bg-white/5 hover:text-white"
                  >
                    {item.label}
                  </button>
                ),
              )}
              <button
                onClick={handleJoinClick}
                className="block w-full rounded-md border border-amber-300/30 bg-gradient-to-r from-amber-500 to-amber-600 px-3 py-2 font-semibold text-slate-950"
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
