import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const HandleLogout = () => {
    console.log("logging Out....");
    logout();
  };
  const navLinks = [{ name: "Profile", href: "/Profile" }];

  return (
    <nav className="bg-black/90 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <span
              onClick={() => navigate("/chat")}
              className="cursor-pointer text-2xl font-bold bg-gradient-to-r from-gray-100 via-gray-400 to-gray-800 bg-[length:200%_200%] animate-gradient bg-clip-text text-transparent"
            >
              Trend Up
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-white/80 hover:text-white px-3 py-2 font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={HandleLogout}
              className="bg-black/90 text-white px-4 py-1 rounded-md hover:bg-gray/50 transition"
            >
              logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:bg-blue-50 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={HandleLogout}
              className="w-full text-left bg-blue-600 text-white px-3 py-2 rounded-md font-medium mt-4"
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
