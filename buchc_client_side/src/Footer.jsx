import { Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#0b1220] to-[#060b16] text-gray-300 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-14">
          <h3 className="text-3xl font-semibold text-white mb-2">
            Get In Touch
          </h3>
          <p className="text-gray-400 text-sm">
            Have questions? Want to join? We'd love to hear from you!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
          <div className="bg-[#111a2e] rounded-xl px-6 py-5 w-64 text-center shadow-md hover:shadow-lg transition">
            <Mail className="mx-auto mb-3 text-blue-500" size={20} />
            <p className="text-sm text-gray-400 mb-1">Email Us</p>
            <p className="text-white text-sm font-medium">buchc@bracu.ac.bd</p>
          </div>

          <div className="bg-[#111a2e] rounded-xl px-6 py-5 w-64 text-center shadow-md hover:shadow-lg transition">
            <MapPin className="mx-auto mb-3 text-blue-500" size={20} />
            <p className="text-sm text-gray-400 mb-1">Visit Us</p>
            <p className="text-white text-sm font-medium">
              BRAC University
              <br />
              66 Mohakhali, Dhaka 1212
            </p>
          </div>
        </div>
        <div className="text-center mb-12">
          <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2 rounded-lg transition">
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
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Our Team</li>
              <li className="hover:text-white cursor-pointer">Top Players</li>
              <li className="hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
          <div>
            <p className="text-white font-medium mb-2 text-sm">Follow Us</p>
            <div className="flex gap-4">
              <Facebook
                size={18}
                className="hover:text-blue-500 cursor-pointer"
              />
              <Instagram
                size={18}
                className="hover:text-pink-500 cursor-pointer"
              />
              <Linkedin
                size={18}
                className="hover:text-blue-400 cursor-pointer"
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
