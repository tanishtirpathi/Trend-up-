import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const navLinks = [{ name: "Profile", href: "/profile" }];

  return (
    <nav className="bg-white/90 fixed w-full z-50 backdrop-blur-md px-5 ">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <span
            onClick={() => navigate("/chat")}
            className="cursor-pointer text-2xl font-bold text-slate-800 hover:text-blue-600 transition"
          >
            Trend Up
          </span>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-600 font-serif hover:text-gray-600 font-bold transition"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg font-serif bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-blue-600 transition"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-50 border-t border-slate-200">
          <div className="px-6 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-slate-600 hover:text-blue-600 font-medium"
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={handleLogout}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
