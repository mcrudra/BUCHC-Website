import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../src/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (currentScrollY < 12 || currentScrollY < lastScrollY) {
          setVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 12) {
          setVisible(false);
        }
        lastScrollY = currentScrollY;
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on any scroll
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("scroll", close, { passive: true });
    return () => window.removeEventListener("scroll", close);
  }, [open]);

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
    { label: "BUCHC Gallery", route: "/gallery" },
    { label: "Contact Us", sectionId: "contact" },
  ];

  const handleJoinClick = () => {
    navigate("/registration");
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 w-full border-b border-white/10 bg-slate-950/90 backdrop-blur-sm shadow-[0_10px_40px_rgba(2,6,23,0.45)] transform transition-transform duration-150 ease-out will-change-transform ${visible ? "translate-y-0" : "-translate-y-full"}`}
    >
      {/* Full-width container — logo hard-left, nav hard-right */}
      <div className="w-full px-4 sm:px-12 lg:px-12">
        <div className="flex items-center justify-between md:py-5">
          {/* Logo + Club name — left */}
          <div className="flex items-center gap-3.5">
            <div className="rounded-full border border-amber-400/30 py-1.5 bg-white/5  shadow-[0_0_30px_rgba(202,138,4,0.15)]">
              <img
                src={logo}
                alt="BUCHC Logo"
                className="w-12 h-10 md:w-10 md:h-7 rounded-full"
              />
            </div>
            <div>
              <span className="block text-[12px] uppercase tracking-[0.28em] text-amber-200/70">
                BRAC University
              </span>
              <span className="block text-base md:text-xl font-bold tracking-wide text-white">
                Chess Club
              </span>
            </div>
          </div>

          {/* Nav items + CTA — right (desktop) */}
          <div className="hidden md:flex items-center gap-7 lg:gap-9">
            {navItems.map((item) =>
              item.sectionId ? (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.sectionId)}
                  className="text-sm lg:text-base text-slate-300 hover:text-white font-medium transition-colors"
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
                  className="text-sm lg:text-base text-slate-300 hover:text-white font-medium transition-colors"
                >
                  {item.label}
                </button>
              ),
            )}
            <button
              onClick={handleJoinClick}
              className="rounded-full border border-amber-300/30 bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-2.5 text-sm font-semibold text-slate-950 shadow-lg shadow-amber-950/30 transition hover:from-amber-400 hover:to-amber-500"
            >
              Join BUCHC
            </button>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden text-white"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu — always rendered, animated with max-height + opacity */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open
              ? "max-h-[400px] opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
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
      </div>
    </nav>
  );
};

export default Navbar;
