import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../src/assets/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Our Team", href: "#" },
    { label: "Top Players", href: "#" },
    { label: "Events", href: "#" },
    { label: "Contact Us", href: "#" },
  ];

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
            <span className="text-lg md:text-xl font-bold text-gray-800">
              BRAC University Chess Club
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-500 hover:text-gray-900 font-medium"
              >
                {item.label}
              </a>
            ))}
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md font-medium ">
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
      </div>
    </nav>
  );
};

export default Navbar;
